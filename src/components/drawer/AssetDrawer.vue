<template>
    <a-drawer v-model:open="open" title="资产" placement="right" @after-open-change="afterOpenChange">
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="背景音乐">
                <template #extra>
                    <a href="#" @click="handleClick($event, 'addImage')">添加</a>
                </template>
                <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="音频">
                <template #extra>
                    <a href="#" @click="handleClick($event, 'addImage')">添加</a>
                </template>
                <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="配音">
                <template #extra>
                    <a href="#" @click="handleClick($event, 'addImage')">添加</a>
                </template>
                <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="立绘">
                <template #extra>
                    <a href="#" @click="handleClick($event, 'addSprite')">添加</a>
                </template>
                <a-col :span="8" v-for="(value, key) in AssetsManager.spriteAssets" :key="key">
                    <a-image :src="value[1].resource" />
                </a-col>
            </a-collapse-panel>
            <a-collapse-panel key="5" header="图像">
                <template #extra>
                    <a href="#" @click="handleClick($event, 'addImage')">添加</a>
                </template>
                <a-row :gutter="16">
                    <a-col :span="8" v-for="(value, key) in AssetsManager.imageAssets" :key="key">
                        <a-image :src="value[1].resource" />
                    </a-col>
                </a-row>
            </a-collapse-panel>
        </a-collapse>
        <asset-upload-modal ref="AssetUploadModalRef" @handleOk="uploadHandleOk"></asset-upload-modal>
    </a-drawer>
</template>
<script lang="ts" setup>
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
//----
import { ref, watch, inject } from 'vue';
import AssetUploadModal from '../modal/AssetUploadModal.vue'
const AssetsManager: any = inject("AssetsManager");
const open = ref<boolean>(false);
const AssetUploadModalRef = ref()
const activeKey = ref(['1']);

const afterOpenChange = (bool: boolean) => {
    console.log('open', bool);
};
const handleClick = (event: MouseEvent, callEvent: string) => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
    AssetUploadModalRef.value.showModal(callEvent)
};

const uploadHandleOk = () => {
    console.log(AssetsManager.imageAssets);

}
const showDrawer = () => {
    open.value = true;

};
watch(activeKey, val => {
    console.log(val);
});
defineExpose({
    showDrawer
})
</script>