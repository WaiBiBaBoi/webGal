import { v4 } from "uuid";
import Command from "./command";
import { IVisitor } from ".";

export default class TextCommand extends Command {
  id: string = v4();
  name: string = "text";
  cnName: string = "文字指令";
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitTextCommand(this);
  }
}
