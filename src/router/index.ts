import { createRouter, createWebHistory } from 'vue-router'

import { constantRoutes, asyncRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
})

export default router
