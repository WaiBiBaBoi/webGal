import { createApp,reactive } from 'vue'
import './style.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'; // 导入路由实例
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import engine from './engine/engine'
import AssetsManager from './assetsManager/manager'
import { useSceneStore } from './stores/sceneStores'; // 在此引入 store
// const webEngine = reactive(new engine());
let webAssetsManager = reactive(new AssetsManager)
const app = createApp(App);

const pinia:any = createPinia();
app.use(pinia)

app.provide('SceneStore', useSceneStore());
app.provide('webEngine', new engine());
app.provide('AssetsManager', webAssetsManager);

app.use(Antd).use(router).mount('#app')
