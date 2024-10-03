export default class AssetsManager {
  // public static readonly bgmAssets: Map<string, Blob> = new Map();
  // public static readonly voiceAssets: Map<string, Blob> = new Map();
  // public static readonly soundAssets: Map<string, Blob> = new Map();
  imageAssets: Map<string, Asset> = new Map();
  spriteAssets: Map<string, Asset> = new Map();
  
 addImage(file: File) {
    if (this.imageAssets.has(file.name)) return false;
    this.imageAssets.set(file.name, new Asset(file));
    return true;
  }

  removeImage(name: string) {
    const asset = this.imageAssets.get(name);
    if (!asset) return false;
    asset.clear();
    this.imageAssets.delete(name);
    return true;
  }

  addSprite(file: File) {
    if (this.spriteAssets.has(file.name)) return false;
    this.spriteAssets.set(file.name, new Asset(file));
    return true;
  }

  removeSprite(name: string) {
    const asset = this.spriteAssets.get(name);
    if (!asset) return false;
    asset.clear();
    this.spriteAssets.delete(name);
    return true;
  }
}

type ImageURL = string;

class Asset {
  public readonly blob: Blob;
  public resource: ImageURL;

  constructor(file: File) {
    this.blob = file;
    this.resource = URL.createObjectURL(file);
  }
  public clear() {
    URL.revokeObjectURL(this.resource);
  }
}
