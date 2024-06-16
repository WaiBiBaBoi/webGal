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
  cnName: string = "精灵指令";
  assetName?: string;
  location: SpriteLocation = SpriteLocation.Left;

  constructor(assetName?: string, location?: SpriteLocation) {
    super();
    this.assetName = assetName;
    this.location = location ?? SpriteLocation.Left;
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitSpriteCommand(this);
  }
}

export class CloseSpriteCommand extends Command {
  id: string = v4();
  name: string = "close-sprite";
  cnName: string = "关闭精灵指令";
  location: SpriteLocation;

  constructor(location: SpriteLocation) {
    super();
    this.location = location;
  }

  accept(visitor: IVisitor): Promise<void> {
    return visitor.visitCloseSpriteCommand(this);
  }
}
