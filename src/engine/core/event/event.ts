import { EventEmitter } from "pixi.js";

type EventKind = {
  next: symbol;
};

export const eventKind: EventKind = {
  next: Symbol("next"),
};

export const event = new EventEmitter();
