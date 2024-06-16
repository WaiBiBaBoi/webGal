// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoadEntry from '../views/LoadEntry.vue';
import GameEditor from '../views/GameEditor.vue';

// 定义路由规则，每个路由映射一个组件。
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoadEntry',
    component: LoadEntry
  },
  {
    path: '/game-editor',
    name: 'GameEditor',
    component: GameEditor
  },
  // 更多路由规则可以在这里添加
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 历史模式
  routes // 路由规则
});

export default router;
