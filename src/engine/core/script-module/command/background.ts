import { v4 } from "uuid";
import { Command, IVisitor } from ".";

export default class BackgroundCommand extends Command {
  id: string = v4();
  name: string = "background";
  cnname:string = '背景图片'
  remark?: string;
  assetName?: string;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitBackgroundCommand(this);
  }
}
