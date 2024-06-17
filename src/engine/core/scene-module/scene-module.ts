import { Application, Container, Sprite, Texture } from "pixi.js";
import { SpriteLocation } from "../script-module/command/sprite";
import { event, eventKind } from "../event/event";
import SceneControls from "./controls";

type SceneConfig = {
  textSpeed: number;
  statementSpeed: number;
  auto: boolean;
};

export type PixiConfig = {
  width: number;
  height: number;
  resizeTo?: Window | HTMLElement;
  background?: string;
};

type SpriteContainerState = {
  left?: Sprite;
  center?: Sprite;
  right?: Sprite;
};

type BackgroundContainerState = {
  value?: Sprite;
};

export type Config = {
  width: number;
  height: number;
};

export default class SceneModule {
  sceneConfig: SceneConfig = {
    textSpeed: 80,
    statementSpeed: 1500,
    auto: false,
  };
  controls: SceneControls = new SceneControls();
  pixi: Application = new Application();
  spriteContainer: Container = new Container();
  spriteContainerState: SpriteContainerState = {};
  backgroundContainer: Container = new Container();
  backgroundContainerState: BackgroundContainerState = {};
  imageLayerContainer: Container = new Container();

  async initSceneControls(config: Config) {
    const pixiConfig: PixiConfig = {
      width: config.width,
      height: config.height,
      background: "#242424",
    };
    await this.initPixi(pixiConfig);
    this.controls.sceneElement.appendChild(this.pixi.canvas);
    this.controls.setSceneSize(config.width, config.height);
    this.setTextBoxElement();
    this.setAutoElement();
  }

  async initPixi(pixiConfig: PixiConfig) {
    await this.pixi.init(pixiConfig);
    this.pixi.stage.addChild(this.backgroundContainer);
    this.pixi.stage.addChild(this.spriteContainer);
    this.pixi.stage.addChild(this.imageLayerContainer);
  }

  setTextBoxElement() {
    this.controls.textBox.onclick = (_) => {
      event.emit(eventKind.next);
    };
  }

  setAutoElement() {
    this.controls.autoButton.textContent = this.sceneConfig.auto
      ? "true"
      : "false";
    this.controls.autoButton.onclick = (_) => {
      this.sceneConfig.auto = !this.sceneConfig.auto;
      this.controls.autoButton.textContent = this.sceneConfig.auto
        ? "true"
        : "false";
    };
  }

  clearTextBox() {
    this.controls.textBox.textContent = "";
  }

  displayText(value: string) {
    this.controls.textBox.textContent += value;
  }

  displaySprite(image: Texture, location: SpriteLocation) {
    const sprite = new Sprite(image);
    sprite.scale.set(0.5);
    switch (location) {
      case SpriteLocation.Left:
        sprite.anchor.y = 0.5;
        sprite.y = this.pixi.screen.height / 2;
        if (this.spriteContainerState.left) {
          this.spriteContainerState.left.destroy();
          this.spriteContainer.removeChild(this.spriteContainerState.left);
        }
        this.spriteContainerState.left = sprite;
        break;
      case SpriteLocation.Center:
        sprite.anchor.set(0.5);
        sprite.x = this.pixi.screen.width / 2;
        sprite.y = this.pixi.screen.height / 2;
        if (this.spriteContainerState.center) {
          this.spriteContainerState.center.destroy();
          this.spriteContainer.removeChild(this.spriteContainerState.center);
        }
        this.spriteContainerState.center = sprite;
        break;
      case SpriteLocation.Right:
        sprite.anchor.y = 0.5;
        sprite.x = this.pixi.screen.width - sprite.width;
        sprite.y = this.pixi.screen.height / 2;
        if (this.spriteContainerState.right) {
          this.spriteContainerState.right.destroy();
          this.spriteContainer.removeChild(this.spriteContainerState.right);
        }
        this.spriteContainerState.right = sprite;
        break;
    }
    this.spriteContainer.addChild(sprite);
  }

  closeSprite(location: SpriteLocation) {
    switch (location) {
      case SpriteLocation.Left:
        if (this.spriteContainerState.left) {
          this.spriteContainer.removeChild(this.spriteContainerState.left);
          this.spriteContainerState.left.destroy();
          this.spriteContainerState.left = undefined;
        }
        break;
      case SpriteLocation.Center:
        if (this.spriteContainerState.center) {
          this.spriteContainer.removeChild(this.spriteContainerState.center);
          this.spriteContainerState.center.destroy();
          this.spriteContainerState.center = undefined;
        }
        break;
      case SpriteLocation.Right:
        if (this.spriteContainerState.right) {
          this.spriteContainer.removeChild(this.spriteContainerState.right);
          this.spriteContainerState.right.destroy();
          this.spriteContainerState.right = undefined;
        }
        break;
    }
  }

  setBackground(image: Texture) {
    const bg = new Sprite(image);
    [bg.x, bg.y] = [0, 0];
    [bg.width, bg.height] = [this.pixi.screen.width, this.pixi.screen.height];
    if (this.backgroundContainerState.value) {
      this.backgroundContainer.removeChild();
      this.backgroundContainerState.value.destroy();
      this.backgroundContainerState.value = undefined;
    }
    this.backgroundContainer.addChild(bg);
    this.backgroundContainerState.value = bg;
  }
}
