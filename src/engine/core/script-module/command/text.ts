import { v4 } from "uuid";
import Command from "./command";
import { IVisitor } from ".";

export default class TextCommand extends Command {
  id: string = v4();
  name: string = "text";
  cnname: string = "台词演出";
  remark?: string;
  value?: string;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitTextCommand(this);
  }
}
