export const constantRoutes = [
  { path: '/', component: () => import('@/views/Home/index.vue') },
  { path: '/product', component: () => import('@/views/Product/index.vue') },
  { path: '/user', component: () => import('@/views/User/index.vue') },
]

export const asyncRoutes = []
