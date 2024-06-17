import Command from "./command";
import { CloseSpriteCommand, SpriteCommand } from "./sprite";
import TextCommand from "./text";
import BackgroundCommand from "./background";
import GotoSceneCommand from "./goto-scene";

export interface IVisitor {
  visitTextCommand(command: TextCommand): Promise<void>;
  visitSpriteCommand(command: SpriteCommand): Promise<void>;
  visitCloseSpriteCommand(command: CloseSpriteCommand): Promise<void>;
  visitBackgroundCommand(command: BackgroundCommand): Promise<void>;
  visitGotoSceneCommand(command: GotoSceneCommand): Promise<void>;
}

export { Command };
export { TextCommand };
export { CloseSpriteCommand, SpriteCommand };
export { BackgroundCommand };
export { GotoSceneCommand };
