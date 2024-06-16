import { v4 } from "uuid";
import { Command, IVisitor } from ".";

export default class BackgroundCommand extends Command {
  id: string = v4();
  name: string = "background";
  cnName: string = "背景指令";
  assetName?: string;

  constructor(assetName?: string) {
    super();
    this.assetName = assetName;
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitBackgroundCommand(this);
  }
}
