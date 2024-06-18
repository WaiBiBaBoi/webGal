import { v4 } from "uuid";
import { Command, IVisitor } from ".";

export enum SpriteLocation {
  Left,
  Center,
  Right,
}

export class SpriteCommand extends Command {
  id: string = v4();
  name: string = "sprite";
  cnname: string = "立绘";
  remark?: string;
  assetName?: string;
  location: SpriteLocation = SpriteLocation.Left;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitSpriteCommand(this);
  }
}

export class CloseSpriteCommand extends Command {
  id: string = v4();
  name: string = "close-sprite";
  remark?: string;
  location?: SpriteLocation;

  constructor() {
    super();
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitCloseSpriteCommand(this);
  }
}
