import { defineStore } from "pinia";
import { Scene } from "../interface";

// 定义 state 的接口

interface SceneState {
  scenes: Array<Scene>;
}

export const useSceneStore = defineStore("counter", {
  state: (): SceneState => ({
    scenes: [],
  }),
  getters: {},
  actions: {
    init() {},
    addScene(scene: Scene) {
      this.scenes.push(scene);
    },
    editScene(uuid: string, scene: Scene) {
      for (let i = 0; i < this.scenes.length; i++) {
        if (uuid === this.scenes[i].id) {
          this.scenes.splice(i, 1, scene);
          break;
        }
      }
    },
    delScene(uuid: string) {
      for (let i = 0; i < this.scenes.length; i++) {
        if (uuid === this.scenes[i].id) {
          this.scenes.splice(i, 1);
          break;
        }
      }
    },
    addSceneCommand(uuid: string, command: any) {
      for (let i = 0; i < this.scenes.length; i++) {
        if (uuid === this.scenes[i].id) {
          this.scenes[i].commands.push(command);
          break;
        }
      }
    },
    editSceneCommand(uuid: string, command: any) {
      let editok = false;
      for (let i = 0; i < this.scenes.length; i++) {
        if (editok) break;
        if (uuid === this.scenes[i].id) {
          for (let j = 0; j < this.scenes[i].commands.length; j++) {
            this.scenes[i].commands.splice(j, 1, command);
            editok = true;
            break;
          }
        }
      }
    },
    delSceneCommand(uuid: string, command: any) {
      let editok = false;
      for (let i = 0; i < this.scenes.length; i++) {
        if (editok) break;
        if (uuid === this.scenes[i].id) {
          for (let j = 0; j < this.scenes[i].commands.length; j++) {
            if (this.scenes[i].commands[j].id === command.id) {
              this.scenes[i].commands.splice(j, 1);
              editok = true;
              break;
            }
          }
        }
      }
    },
  },
});
