<template>
    <div class="game-editor-main">
        <a-row>
            <a-col :span="24">
                <div class="head-menu">
                    <a-row>
                        <a-col :span="4">
                            <div class="logo">WebGal: {{ currentScene.name }} </div>
                        </a-col>
                        <a-col :span="20">
                            <div class="menu-list">
                                <div class="menu-item">
                                    <a-row>
                                        <a-col v-for="(item, index) in menus" :key="index">
                                            <a-button type="link" @click="openDrawer(item.value)">{{ item.text
                                                }}</a-button>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="command-list">
                    <div class="command-item" :draggable="true" @dragstart="dragStart(index)"
                        @dragover="dragOver(index, $event)" @drop="drop(index, $event)" @dragend="dragEnd"
                        v-for="(item, index) in currentScene.commands" :key="index">
                        <a-card :title="item.cnname" style="width: 100%">
                            <template #extra>
                                <a href="#" style="margin-right: 8px;" @click="openSetCommandDrawer(item)">编辑</a>
                                <a-popconfirm title="确认移除该指令?" ok-text="是" cancel-text="否"
                                    @confirm="confirmDelCommand(item)">
                                    <a href="#">移除</a>
                                </a-popconfirm>
                            </template>
                            <p>{{ item.remark }}</p>
                        </a-card>
                    </div>
                </div>
            </a-col>
            <a-col :span="20">
                <div style="width: 100%;height: 100%" id="stage-main">

                </div>
            </a-col>
        </a-row>
        <add-command-drawer ref="AddCommandDrawerRef"></add-command-drawer>
        <scene-drawer ref="SceneDrawerRef" @selectSceneOk="selectSceneOk"></scene-drawer>
        <asset-drawer ref="AssetDrawerRef"></asset-drawer>
        <run-game-modal ref="RunGameModalRef"></run-game-modal>
        <!-- **** -->
        <background-drawer ref="BackgroundDrawerRef"></background-drawer>
        <goto-scene-drawer ref="GotoSceneDrawerRef"></goto-scene-drawer>
        <sprite-drawer ref="SpriteDrawerRef"></sprite-drawer>
        <text-drawer ref="TextDrawerRef"></text-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, toRaw } from 'vue'
import { useSceneStore } from '../stores/sceneStores'
import { Scene } from '../interface'
import { Assets } from '../engine/core/assets/assets'
import SaveZip from '../tool/jszip'
//--导航栏
import AddCommandDrawer from '../components/drawer/AddCommandDrawer.vue'
import SceneDrawer from '../components/drawer/SceneDrawer.vue'
import AssetDrawer from '../components/drawer/AssetDrawer.vue'
import RunGameModal from '../components/modal/RunGameModal.vue'
const AddCommandDrawerRef = ref()
const SceneDrawerRef = ref()
const AssetDrawerRef = ref()
const RunGameModalRef = ref()

//--指令
import BackgroundDrawer from '../components/commandDrawer/BackgroundDrawer.vue'
import GotoSceneDrawer from '../components/commandDrawer/GotoSceneDrawer.vue'
import SpriteDrawer from '../components/commandDrawer/SpriteDrawer.vue'
import TextDrawer from '../components/commandDrawer/TextDrawer.vue'
const BackgroundDrawerRef = ref()
const GotoSceneDrawerRef = ref()
const SpriteDrawerRef = ref()
const TextDrawerRef = ref()
//--
const webEngine: any = inject("webEngine");
const AssetsManager: any = inject('AssetsManager')
const SceneStore = useSceneStore()
console.log(webEngine);

interface MenuItem {
    text: string,
    value: string
}
const menus: MenuItem[] = [
    {
        text: '场景',
        value: 'scene-drawer'
    }, {
        text: '指令',
        value: 'command-drawer'
    },
    {
        text: '资产',
        value: 'asset-drawer'
    }, {
        text: '控件',
        value: ''
    },
    {
        text: '变量',
        value: ''
    },
    {
        text: '配置',
        value: ''
    },
    {
        text: '运行',
        value: 'run-game-modal'
    },
    {
        text: '保存',
        value: 'ctrl-s'
    },
]

let currentScene = ref<Scene>({
    id: '',
    name: '',
    remark:'',
    commands: []
})
const openDrawer = async (drawerType: string) => {
    if (drawerType === 'command-drawer') {
        AddCommandDrawerRef.value.showDrawer(currentScene.value.id)
    }

    if (drawerType === 'scene-drawer') {
        SceneDrawerRef.value.showDrawer()
    }

    if (drawerType === 'asset-drawer') {
        AssetDrawerRef.value.showDrawer()
    }

    if (drawerType === 'run-game-modal') {
        console.log(toRaw(SceneStore.scenes));
        for (let [key, value,] of AssetsManager.spriteAssets) {
            await Assets.ImageAssets.load(key, value.blob)
        }
        for (let [key, value] of AssetsManager.imageAssets) {
            await Assets.ImageAssets.load(key, value.blob)
        }
        console.log(Assets);

        webEngine.run(toRaw(SceneStore.scenes))
        // RunGameModalRef.value.showModal()
    }

    if(drawerType === 'ctrl-s'){
        /**
         * 参数1：场景列表
         * 参数2：资产对象
         * 
         */
        SaveZip(SceneStore.scenes,AssetsManager)
    }
}
interface Command {
    name: string
    sceneid: string
}
const openSetCommandDrawer = (command: Command) => {
    command.sceneid = currentScene.value.id
    if (command.name === 'background') {
        BackgroundDrawerRef.value.showDrawer(command)
    }

    if (command.name === 'goto-scene') {
        GotoSceneDrawerRef.value.showDrawer(command)
    }

    if (command.name === 'sprite') {
        SpriteDrawerRef.value.showDrawer(command)
    }

    if (command.name === 'text') {
        TextDrawerRef.value.showDrawer(command)
    }

    
}

const confirmDelCommand = (command: Command) => {
    SceneStore.delSceneCommand(currentScene.value.id, command)
}

const selectSceneOk = (scene: Scene) => {
    currentScene.value = scene
}

// 拖拽代码👇
// 在一些浏览器中，drop事件默认情况下被阻止。为了确保drop事件能够正常触发，你需要在dragover事件的处理函数中调用event.preventDefault()。
let dragIndex = ref(-1);
let dropIndex = ref(-1);
// 开始
const dragStart = (index: number) => {
    dragIndex.value = index;
};
// 移动
const dragOver = (index: number, event: DragEvent) => {
    event.preventDefault();
    dropIndex.value = index;
};
// 放下
const drop = (index: number, event: DragEvent) => {
    event.preventDefault();
    if (dragIndex.value !== index) {
        const draggedItem = currentScene.value.commands[dragIndex.value];
        currentScene.value.commands.splice(dragIndex.value, 1);
        currentScene.value.commands.splice(index, 0, draggedItem);
    }
    dragIndex.value = -1;
    dropIndex.value = -1;
};
// 结束
const dragEnd = () => {
    dragIndex.value = -1;
    dropIndex.value = -1;
};
// 拖拽代码结束

const initStage = () => {
    let stageMainElement = document.getElementById('stage-main')
    let width = stageMainElement?.offsetWidth
    let height = stageMainElement?.offsetHeight
    return webEngine.create({ width, height })
    function getCurrentScreenAspectRatio(): string {
        // 获取屏幕的宽度和高度
        const width: number = window.screen.width;
        const height: number = window.screen.height;

        // 计算显示器的比例
        const ratio: number = width / height;

        // 返回宽高比，四舍五入到两位小数
        return ratio.toFixed(2);
    }

    // 使用该函数获取当前显示器的比例
    const currentScreenRatio: string = getCurrentScreenAspectRatio();

    // 判断当前显示器的比例
    if (Math.abs(parseFloat(currentScreenRatio) - 16 / 9) < 0.05) {
        console.log("当前显示器比例为 16:9");
    } else if (Math.abs(parseFloat(currentScreenRatio) - 16 / 10) < 0.05) {
        console.log("当前显示器比例为 16:10");
    } else if (Math.abs(parseFloat(currentScreenRatio) - 21 / 9) < 0.05) {
        console.log("当前显示器比例为 21:9");
    }

}
onMounted(async () => {

    let stageElement = await initStage()
    console.log(stageElement);
    document.getElementById('stage-main')?.append(stageElement)
})
</script>

<style lang="less" scoped>
@headMenuHeight: 32px;

.head-menu {
    height: @headMenuHeight;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;

    .logo {
        width: 100%;
        height: 100%;
        border-right: 1px solid #eee;
        line-height: @headMenuHeight;
        text-align: center;
    }

    .menu-list {
        text-align: center;
    }
}

.command-list {
    border-right: 1px solid #eee;
    height: calc(100vh - @headMenuHeight);
    padding: 8px;
    overflow-y: auto;
    .command-item {
        margin-bottom: 8px;
    }
}
</style>