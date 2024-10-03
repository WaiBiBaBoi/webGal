// 导入JSZip库
import JSZip from "jszip";
import { v4 } from "uuid";

/**
 * 需要导出的数据
 * 场景-指令数据
 * 资产数据
 * 变量数据
 * Ui数据
 * 配置数据
 */

interface Command {
  [key: string]: any; // 可以根据具体的命令结构替换 `any` 为实际类型
}
const HandleScene = (rootScene: JSZip | null | undefined, scenes: any) => {
  for (let i = 0; i < scenes.length; i++) {
    // 复制场景的基本信息，确保属性存在
    let tempScene = {
      id: scenes[i].id || "",
      name: scenes[i].name || `scene-${i}`,
      remark: scenes[i].remark || "",
    };

    // 创建场景文件夹
    let sceneFolder = rootScene?.folder(`${i}-scene`);
    sceneFolder?.file(
      tempScene.name + ".json",
      JSON.stringify(tempScene, null, 2)
    ); // 保存场景信息到文件

    // 创建命令文件夹
    let commandFolder = sceneFolder?.folder("command");

    for (let j = 0; j < scenes[i].commands.length; j++) {
      let tempCommand: Command = {};
      // 复制命令的所有键值对，确保属性存在
      for (let key in scenes[i].commands[j]) {
        tempCommand[key] = scenes[i].commands[j][key] || "";
      }
      // 生成唯一的命令文件名，包含命令索引、名称和UUID
      let commandFileName = `${j}-${tempCommand.name}-${v4()}.json`;
      // 生成文件
      commandFolder?.file(
        commandFileName,
        JSON.stringify(tempCommand, null, 2)
      );
    }
  }
};

const HandleAsset = (
  rootAsset: JSZip | null | undefined,
  AssetsManager: any
) => {
  let imageFolder = rootAsset?.folder("assetIamge");
  for (const [key, value] of AssetsManager.imageAssets) {
    imageFolder?.file(key, value.blob);
  }

  let spriteFolder = rootAsset?.folder("assetSprite");
  for (const [key, value] of AssetsManager.spriteAssets) {
    spriteFolder?.file(key, value.blob);
  }
};

// SaveZip函数，接受一个场景数组并生成并下载一个压缩包
/**
 * 参数1：场景列表
 * 参数2：资产对象
 *
 */
const SaveZip = (scenes: any, AssetsManager: any) => {
  // 创建一个新的JSZip实例
  const zip = new JSZip();
  let rootFolder = zip.folder("gameZip"); // 创建根文件夹“gameZip”
  // 创建资源文件夹
  let rootAsset = rootFolder?.folder("asset");

  // 创建场景-指令文件夹
  let rootScene = rootFolder?.folder("scene");
  // 处理场景-指令数据
  HandleScene(rootScene, scenes);
  // 生成压缩包并下载
  HandleAsset(rootAsset, AssetsManager);
  zip
    .generateAsync({ type: "blob" })
    .then(function (content) {
      // 创建一个下载链接
      const downloadLink = document.createElement("a");
      // 使用URL.createObjectURL创建一个指向Blob的URL
      downloadLink.href = URL.createObjectURL(content);
      // 设置下载文件的名称
      downloadLink.download = "data.zip";

      // 将下载链接添加到文档中
      document.body.appendChild(downloadLink);

      // 模拟点击下载链接，开始下载压缩包
      downloadLink.click();

      // 下载完成后移除下载链接
      document.body.removeChild(downloadLink);
    })
    .catch((error) => {
      console.error("Error generating ZIP file", error);
    });
};

export default SaveZip;
