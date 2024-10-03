<template>
    <a-drawer v-model:open="open" title="编辑" placement="right" @after-open-change="afterOpenChange">
        <div>
            <a-form :model="command" :layout="'vertical'">
                <a-form-item label="Username" name="username">
                    <a-input style="width: 100%;" v-model:value="command.username" />
                </a-form-item>
            </a-form>
        </div>
        <template #footer>
            <a-button type="primary">保存</a-button>
        </template>
    </a-drawer>
</template>
<!-- 该文件未使用 -->
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);
let command = ref<any>({})
const afterOpenChange = (bool: boolean) => {
    console.log('open', bool);
};

const showDrawer = () => {
    open.value = true;
};

defineExpose({
    showDrawer
})
</script>

<style lang="less" scoped></style>