import { defineStore } from "pinia";
import {Scene} from '../interface'


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
    addScene(scene:Scene) {
        this.scenes.push(scene)
    },
    editScene(uuid:string,scene:Scene){
        for(let i = 0; i < this.scenes.length; i++){
            if(uuid === this.scenes[i].id){
                this.scenes.splice(i,1,scene)
                break
            }
        }
    },
    delScene(uuid:string){
        for(let i = 0; i < this.scenes.length; i++){
            if(uuid === this.scenes[i].id){
                this.scenes.splice(i,1)
                break
            }
        }
    },
    addSceneCommand(uuid:string,command:object){
        for(let i = 0; i < this.scenes.length; i++){
            if(uuid === this.scenes[i].id){
                this.scenes[i].commands.push(command)
                break
            }
        }
    }
  },
});
