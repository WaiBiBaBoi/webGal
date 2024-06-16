<template>
     <a-modal v-model:open="open" :title="title" @ok="handleOk" @cancel="handleCancel" >
            <!-- :closable="false" :maskClosable="false" -->
            <div>
                <a-upload :accept="accept" :file-list="fileList" :before-upload="handleBeforeUpload" :remove="removeFile">
                    <a-button>
                        <UploadOutlined /> 选择文件
                    </a-button>
                </a-upload>
                <hr>
            </div>
        </a-modal>
</template>
<script lang="ts" setup>
import { ref,inject } from 'vue';
const AssetsManager:any = inject("AssetsManager");
let emit = defineEmits(['handleOk'])
const open = ref<boolean>(false);
let title = ref<string>('')
const fileList = ref<any>([]);
let callEvent = ref<string>('')
let accept = ref<string>('') // image/*  audio/* ... 
const handleBeforeUpload = (file: any) => {
    console.log(file);
    fileList.value = [...fileList.value, file];
    return false
};
const removeFile = (file:any) => {
    console.log(file);
    for(let i = 0; i < fileList.value.length; i++){
        if(file.name === fileList.value[i].name){
            fileList.value.splice(i,1)
        }
    }
    return true;
}
const showModal = (_callEvent:string) => {
    if(_callEvent === 'addImage' || _callEvent == 'addSprite'){
        accept.value = 'image/*'
    }else{
        accept.value = 'audio/*'
    }
    callEvent.value = _callEvent
    open.value = true;
};

const handleOk = (e: MouseEvent) => {
    console.log(e);
    for(let i = 0; i < fileList.value.length; i++){
        if(AssetsManager[callEvent.value](fileList.value[i])){

        }else{

        }
    }
    emit('handleOk')
    handleCancel()
};

const handleCancel = () => {
    fileList.value = []
    open.value = false;
}
defineExpose({ showModal })
</script>