<template>
    <div class="load-entry-main">
        <div class="btn-container">
            <div class="load-btn-text btn-text">加载项目</div>
            <div class="border_"></div>
            <div class="create-btn-text  btn-text" @click="createProject">创建项目</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const createProject = () => {
    router.push('/game-editor')
}
</script>

<style lang="less" scoped>
.load-entry-main {
    font-size: 24px;
    font-weight: bold;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    .btn-container {
        display: flex;
        padding: 28px 16px;
        border-top: 3px solid #555;
        border-bottom: 3px solid #555;
        .border_ {
            margin: 0 24px;
            width: 3px;
            height: 24px;
            background-color: #555;
        }
        .btn-text{
            cursor: pointer;
        }
        .btn-text:hover{
            color: #1677ff;
        }
    }

}
</style>