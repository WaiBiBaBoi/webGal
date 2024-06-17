import { v4 } from "uuid";
import Command from "./command";
import { IVisitor } from ".";

export default class TextCommand extends Command {
  id: string = v4();
  name: string = "text";
  remark?: string;
  value?: string;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitTextCommand(this);
  }
}
