<template>
    <a-drawer v-model:open="open" title="场景" placement="right" @after-open-change="afterOpenChange">
        <template #extra>
            <a-button @click="openSceneModal">添加</a-button>
        </template>
        <div class="scene-list">
            <div class="scene-item" v-for="(item, index) in SceneStore.scenes" :key="index">
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