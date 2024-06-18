<template>
    <a-drawer v-model:open="open" title="编辑" placement="right" @after-open-change="afterOpenChange">
        <div>
            <a-form :model="command" :layout="'vertical'">
                <a-form-item label="资产：" name="remark">
                    <a-select v-model:value="command.assetName" style="width: 100%">
                        <a-select-option :value="value[0]" v-for="(value, key) in AssetsManager.spriteAssets"
                            :key="key">{{ value[0] }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="位置：" name="remark">
                    <a-select v-model:value="command.location" style="width: 100%">
                        <a-select-option :value="item.value" v-for="(item, index) in location"
                            :key="index">{{ item.label }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="备注：" name="remark">
                    <a-textarea v-model:value="command.remark" :rows="4" />
                </a-form-item>
            </a-form>
        </div>
        <!-- <template #footer>
            <a-button type="primary" @click="submit">保存</a-button>
        </template> -->
    </a-drawer>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useSceneStore } from '../../stores/sceneStores'
const AssetsManager: any = inject("AssetsManager");
const SceneStore = useSceneStore()
const open = ref<boolean>(false);

let command = ref<any>({})
let location = [
    {
        label: '左侧',
        value: 0
    },
    {
        label: '中部',
        value: 1
    },
    {
        label: '右侧',
        value: 2
    }
]
const afterOpenChange = (bool: boolean) => {
    console.log('open', bool);
};

const showDrawer = (commandData: any) => {

    command.value = commandData

    open.value = true;
};
// const submit = () => {
//     SceneStore.editSceneCommand(command.value.sceneid,command.value)
//     open.value = false
// }
defineExpose({
    showDrawer
})
</script>

<style lang="less" scoped></style>