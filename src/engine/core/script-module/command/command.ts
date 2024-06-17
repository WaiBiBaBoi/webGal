import { IVisitor } from ".";

export default abstract class Command {
  abstract id: string;
  abstract name: string;
  abstract remark?: string;

  abstract accept(visitor: IVisitor): Promise<void>;
}
