<template>
  <a-drawer v-model:open="open" title="指令" placement="right" @after-open-change="afterOpenChange">
    <div>
      <a-row :gutter="16">
        <a-col :span="8" v-for="(item, index) in commands" :key="index">
          <div class="command-item">
            <i class="iconfont" :class="item.icon"></i>
            <div class="text">
              {{ item.text }}
            </div>
            <div class="add-btn" >
              <a-button type="primary" size="small" @click="addCommand(item)">添加</a-button>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {TextCommand,CloseSpriteCommand, SpriteCommand,BackgroundCommand} from '../../engine/core/script-module/command/index'
import { useSceneStore } from '../../stores/sceneStores'

const open = ref<boolean>(false);
const SceneStore = useSceneStore()
interface CommandItem {
  text: string
  icon: string
  command: string
}

let commands: CommandItem[] = [
  {
    text: '背景图片',
    command: 'background',
    icon: 'icon-tupian',
  },
  {
    text: '立绘',
    command: 'sprite',
    icon: 'icon-tupian'
  },
  {
    text: '场景跳转',
    command: 'goto-scene',
    icon: 'icon-tiaozhuanrizhi'
  },
  {
    text: '台词演出',
    command: 'text',
    icon: 'icon-taicihuashu'
  },
]

let currentSceneID = ref<string>('')
const afterOpenChange = (bool: boolean) => {
  console.log('open', bool);
};

const showDrawer = (id:string) => {
  currentSceneID.value = id
  open.value = true;
};
const addCommand = (command:CommandItem) => {
  if(command.command === 'background'){
    SceneStore.addSceneCommand(currentSceneID.value,new BackgroundCommand())
  }
}
defineExpose({
  showDrawer
})
</script>

<style lang="less" scoped>
.command-item {
  text-align: center;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 16px;
  aspect-ratio: 1 / 0.8;
  /* 设置宽高比为1:1 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  .iconfont {
    font-size: 24px;
  }

  .text {
    width: 100%;
    padding-top: 10px;
  }
  .add-btn{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(245,245,245,0.8);
    top: -100%;
    transition: 0.3s;
  }
}
.command-item:hover {
  .add-btn{
    top: 0%;

  }
}
</style>