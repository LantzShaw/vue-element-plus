import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import LitecaseDesign from 'litecase-design'
// import { LButton } from 'litecase-design'

import App from './App.vue'
import Home from './views/Home/index.vue'
import Product from './views/Product/index.vue'
import User from './views/User/index.vue'

// In this channel, you will learn how to create our own hooks in our vue project

// Here we have confiured the router alredy
// So we can link to another page

// And now, let's get started
// first we can create a folder in src folder, named 'hooks'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/user', component: User },
  ],
})

const app = createApp(App)

// app.use(LitecaseDesign)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
