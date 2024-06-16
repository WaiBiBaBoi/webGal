import { Assets } from "../assets/assets";
import SceneModule from "../scene-module/scene-module";
import {
  BackgroundCommand,
  CloseSpriteCommand,
  Command,
  IVisitor,
  SpriteCommand,
  TextCommand,
} from "./command";
import { event, eventKind } from "../event/event";
import GotoSceneCommand from "./command/goto-scene";
import Scene from "../scene-module/scene";

interface IScriptModule {
  sceneModule: SceneModule;
}

class Scheduler {
  scenes?: Scene[];
  currentScene?: Scene;
  index: number = 0;
  stacks: Command[] = [];

  load(scenes: Scene[]) {
    this.scenes = scenes;
    this.currentScene = this.scenes[0];
  }

  goto(id: string) {
    const scene = this.scenes?.find((item) => item.name === id);
    this.currentScene = scene;
    this.index = 0;
  }

  pop() {
    if (!this.currentScene) return;
    if (this.index >= this.currentScene.commands.length) return;
    const cmd = this.currentScene.commands[this.index++];
    this.stacks.push(cmd);
    return cmd;
  }
}

export default class ScriptModule implements IVisitor {
  module: IScriptModule;
  scheduler: Scheduler = new Scheduler();

  constructor(module: IScriptModule) {
    this.module = module;
  }

  async run(scenes: Scene[]) {
    this.scheduler.load(scenes);
    while (true) {
      const cmd = this.scheduler.pop();
      if (!cmd) break;
      await this.execute(cmd);
    }
  }

  async execute(command: Command): Promise<void> {
    const label = `execute command <${command.name}>`;
    console.time(label);
    await command.accept(this);
    console.timeEnd(label);
  }

  visitTextCommand(command: TextCommand): Promise<void> {
    const sceneModule = this.module.sceneModule;
    const sceneConfig = sceneModule.sceneConfig;
    return new Promise((resolve, _) => {
      sceneModule.clearTextBox();
      let textIndex = 0;
      const timerId = setInterval(() => {
        if (textIndex < command.value.length) {
          sceneModule.displayText(command.value[textIndex]);
          textIndex++;
        } else {
          clearInterval(timerId);
          if (sceneModule.sceneConfig.auto) {
            setTimeout(resolve, sceneConfig.statementSpeed);
          } else {
            event.once(eventKind.next, () => resolve());
          }
        }
      }, sceneConfig.textSpeed);
    });
  }

  visitSpriteCommand(command: SpriteCommand): Promise<void> {
    const sceneModule = this.module.sceneModule;
    return new Promise((resolve, reject) => {
      if (!command.assetName) {
        reject(new Error("asset name is empty!"));
        return;
      }
      const image = Assets.ImageAssets.get(command.assetName);
      sceneModule.displaySprite(image, command.location);
      resolve();
    });
  }

  visitCloseSpriteCommand(command: CloseSpriteCommand): Promise<void> {
    const sceneModule = this.module.sceneModule;
    return new Promise((resolve, _) => {
      sceneModule.closeSprite(command.location);
      resolve();
    });
  }

  visitBackgroundCommand(command: BackgroundCommand): Promise<void> {
    const sceneModule = this.module.sceneModule;
    return new Promise((resolve, reject) => {
      if (!command.assetName) {
        reject(new Error("asset name is empty!"));
        return;
      }
      const texture = Assets.ImageAssets.get(command.assetName);
      sceneModule.setBackground(texture);
      resolve();
    });
  }

  visitGotoSceneCommand(command: GotoSceneCommand): Promise<void> {
    return new Promise((resolve, _) => {
      this.scheduler.goto(command.sceneId);
      resolve();
    });
  }
}
