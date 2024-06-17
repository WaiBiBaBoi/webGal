export default class SceneControls {
  public readonly sceneElement: HTMLDivElement;
  public readonly textBox: HTMLDivElement;
  public readonly autoButton: HTMLDivElement;

  constructor() {
    this.sceneElement = document.createElement("div");
    this.textBox = document.createElement("div");
    this.autoButton = document.createElement("div");

    this.initSceneElement();
    this.initTextBorder();
    this.initAutoButton();

    this.sceneElement.appendChild(this.textBox);
    this.sceneElement.appendChild(this.autoButton);
  }

  public setSceneSize(width: number, height: number) {
    this.sceneElement.style.width = `${width}px`;
    this.sceneElement.style.height = `${height}px`;
  }

  private initSceneElement() {
  }

  private initTextBorder() {
    this.textBox.style.width = "100%";
    this.textBox.style.height = "200px";
    this.textBox.style.padding = "15px 20px";
    this.textBox.style.position = "fixed";
    this.textBox.style.bottom = "0";
    this.textBox.style.borderTop = "1px solid #ccc";
    this.textBox.style.fontSize = "22px";
  }

  private initAutoButton() {
    this.autoButton.style.width = "60px";
    this.autoButton.style.height = "25px";
    this.autoButton.style.display = "flex";
    this.autoButton.style.justifyContent = "center";
    this.autoButton.style.alignItems = "center";
    this.autoButton.style.backgroundColor = "buttonface";
    this.autoButton.style.cursor = "pointer";
    this.autoButton.style.position = "fixed";
    this.autoButton.style.right = "0";
  }
}
