import { v4 } from "uuid";
import { Command } from "../script-module/command";

export class SceneConfig {
}

export default class Scene {
  id: string = v4();
  name?: string;
  remark?: string;
  commands: Command[] = [];
}
