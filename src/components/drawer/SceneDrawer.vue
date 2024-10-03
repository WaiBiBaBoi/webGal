<template>
    <a-drawer v-model:open="open" title="场景" placement="right" @after-open-change="afterOpenChange">
        <template #extra>
            <a-button @click="openSceneModal">添加</a-button>
        </template>
        <div class="scene-list">
            <div class="scene-item" :draggable="true" @dragstart="dragStart(index)" @dragover="dragOver(index,$event)"
                @drop="drop(index,$event)" @dragend="dragEnd" v-for="(item, index) in SceneStore.scenes" :key="index">
                <a-card :title="item.name" style="width: 100%">
                    <template #extra>
                        <a href="#" style="margin-right: 8px;" @click="selectSceneOk(item)">选择</a>
                        <a href="#" style="margin-right: 8px;" @click="openSceneModal(item)">设置</a>
                        <a-popconfirm title="确认移除该场景?" ok-text="是" cancel-text="否" @confirm="confirmDelScene(item.id)">
                            <a href="#">移除</a>
                        </a-popconfirm>
                    </template>
                    <div>
                        <p>card content</p>
                    </div>
                </a-card>
            </div>
        </div>
        <scene-modal ref="SceneModalRef"></scene-modal>
    </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SceneModal from '../modal/SceneModal.vue'
import { useSceneStore } from '../../stores/sceneStores'

const SceneModalRef = ref()
const SceneStore = useSceneStore()
const open = ref<boolean>(false);

const emit = defineEmits(['selectSceneOk'])
const afterOpenChange = (bool: boolean) => {
    console.log('open', bool);
};

const showDrawer = () => {
    open.value = true;
};

const openSceneModal = (scene: object) => {
    SceneModalRef.value.showModal(scene)
}
const confirmDelScene = (id: string) => {
    SceneStore.delScene(id)
}
const selectSceneOk = (item: object) => {
    emit('selectSceneOk', item)
    open.value = false
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
const dragOver = (index: number,event:DragEvent) => {
    event.preventDefault();
    dropIndex.value = index;
};
// 放下
const drop = (index: number,event:DragEvent) => {
    event.preventDefault();
    if (dragIndex.value !== index) {
        const draggedItem = SceneStore.scenes[dragIndex.value];
        SceneStore.scenes.splice(dragIndex.value, 1);
        SceneStore.scenes.splice(index, 0, draggedItem);
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

defineExpose({
    showDrawer
})
</script>

<style lang="less" scoped>
.scene-list {
    .scene-item {
        margin-bottom: 8px;
    }
}
</style>