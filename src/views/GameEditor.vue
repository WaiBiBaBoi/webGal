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
                    <div class="command-item" v-for="(item, index) in currentScene.commands" :key="index">
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
                3
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
import { ref, inject } from 'vue'
import { useSceneStore } from '../stores/sceneStores'
import { Scene } from '../interface'
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
        text: '配置',
        value: ''
    },
    {
        text: '运行',
        value: 'run-game-modal'
    }
]

let currentScene = ref<Scene>({
    id: '',
    name: '',
    commands: []
})
const openDrawer = (drawerType: string) => {
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
        // RunGameModalRef.value.showModal()
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

const initStage = () => {
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
    } else {
        console.log("当前显示器比例未知");
    }
}
initStage()
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

    .command-item {
        margin-bottom: 8px;
    }
}
</style>