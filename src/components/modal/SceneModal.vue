<template>
    <a-modal v-model:open="open" :title="title" @ok="handleOk" :closable="false" :maskClosable="false">
        <div>
            <a-form :model="sceneForm" :layout="'vertical'">
                <a-form-item label="名称：" name="name">
                    <a-input style="width: 100%;" v-model:value="sceneForm.name" />
                </a-form-item>
                <a-form-item label="备注：" name="name">
                    <a-textarea v-model:value="sceneForm.remark" :rows="4" />
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useSceneStore } from '../../stores/sceneStores'
import Scene from '../../engine/core/scene-module/scene'
let sceneForm = ref<any>({})
const SceneStore = useSceneStore()
const open = ref<boolean>(false);
let title = ref<string>('')

interface SceneType {
    [key: string]: any; // 这里假设 scene 对象的值可以是任何类型
}
const showModal = (scene: SceneType) => {
    open.value = true;
    console.log(scene);
    if (scene.id) {
        for (let key in scene) {
            sceneForm.value[key] = scene[key]
        }
    }else{
        for (let key in sceneForm.value) {
            sceneForm.value[key] = undefined
        }
    }
};

const handleOk = (e: MouseEvent) => {
    console.log(e);
    if(sceneForm.value.id){
        SceneStore.editScene(sceneForm.value.id,sceneForm.value)
    }else{
        let name:string = ''
        if(sceneForm.value.name){
            name = sceneForm.value.name
        }
        SceneStore.addScene(new Scene(name))

    }
    open.value = false;
};
defineExpose({ showModal })
</script>