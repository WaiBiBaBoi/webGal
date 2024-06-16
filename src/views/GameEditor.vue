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
                        <a-card title="播放背景音乐" style="width: 100%">
                            <template #extra>
                                <a href="#" style="margin-right: 8px;" @click="openSetCommandDrawer">编辑</a>
                                <a href="#">移除</a>
                            </template>
                            <p>card content</p>
                        </a-card>
                    </div>
                </div>
            </a-col>
            <a-col :span="20">
                3
            </a-col>
        </a-row>
        <add-command-drawer ref="AddCommandDrawerRef"></add-command-drawer>
        <set-command-drawer ref="SetCommandDrawerRef"></set-command-drawer>
        <scene-drawer ref="SceneDrawerRef" @selectSceneOk="selectSceneOk"></scene-drawer>
        <asset-drawer ref="AssetDrawerRef"></asset-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref,inject } from 'vue'
import AddCommandDrawer from '../components/drawer/AddCommandDrawer.vue'
import SetCommandDrawer from '../components/drawer/SetCommandDrawer.vue'
import SceneDrawer from '../components/drawer/SceneDrawer.vue'
import AssetDrawer from '../components/drawer/AssetDrawer.vue'
import {Scene} from '../interface'
const AddCommandDrawerRef = ref()
const SetCommandDrawerRef = ref()
const SceneDrawerRef = ref()
const AssetDrawerRef = ref()
const webEngine: any = inject("webEngine");
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
    }

]

let currentScene = ref<Scene>({
    id:'',
    name:'',
    commands:[]
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
}

const openSetCommandDrawer = () => {
    SetCommandDrawerRef.value?.showDrawer()
}
const selectSceneOk = (scene:Scene) => {
    currentScene.value = scene
}
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