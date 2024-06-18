<template>
    <a-modal v-model:open="open" title="运行演示" width="50%" :maskClosable="false" :keyboard="false" @ok="handleOk">
        <div style="height: 50vh;">
            
        </div>
        <template #footer>
            <!-- <a-button type="primary">保存</a-button> -->
        </template>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);

const showModal = () => {
    open.value = true;
};

const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
};

defineExpose({ showModal })
</script>