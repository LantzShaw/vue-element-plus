import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import './styles/element/index.scss' // vite.config.ts中配置了additionalData，就不需要引入了
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css' // 这个也不要引了

import router from '@/router'
import store from '@/store'

import App from './App.vue'

// import LitecaseDesign from 'litecase-design'
// import { LButton } from 'litecase-design'

const app = createApp(App)

// app.use(LitecaseDesign)

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
