import { v4 } from "uuid";
import { Command, IVisitor } from ".";

export default class GotoSceneCommand extends Command {
  id: string = v4();
  name: string = "goto-scene";
  cnname:string = '场景跳转'
  remark?: string;
  sceneId?: string;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitGotoSceneCommand(this);
  }
}
