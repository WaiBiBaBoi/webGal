import SceneModule, { Config } from "./core/scene-module/scene-module";
import ScriptModule from "./core/script-module/script-module";
import Scene from "./core/scene-module/scene";

export default class WebGalgameEngine {
  sceneModule: SceneModule;
  scriptModule: ScriptModule;

  constructor() {
    this.sceneModule = new SceneModule();
    this.scriptModule = new ScriptModule({
      sceneModule: this.sceneModule,
    });
  }

  async create(config: Config): Promise<HTMLDivElement> {
    await this.sceneModule.initSceneControls(config);
    return this.sceneModule.controls.sceneElement;
  }

  run(scenes: Scene[]) {
    return this.scriptModule.run(scenes);
  }
}
