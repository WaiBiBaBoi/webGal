import { Assets, Texture } from "pixi.js";

export default class ImageAssets {
  private static _images: Map<string, Texture> = new Map();

  public static async load(name: string, value: Blob): Promise<void> {
    if (this._images.has(name)) return;
    const url = URL.createObjectURL(value);
    const texture = await Assets.load<Texture>({
      alias: name,
      src: url,
      loadParser: "loadTextures",
    });
    this._images.set(name, texture);
  }

  public static get(name: string): Texture {
    const image = this._images.get(name);
    if (!image) throw new Error(`asset "${name}" not found!`);
    return image;
  }
}
