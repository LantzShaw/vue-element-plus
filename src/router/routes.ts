type RouteObject = {
  path: string
  // component:
}

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/BaseLayout.vue'),
    children: [
      {
        // redirect: '/',
        path: '/',
        component: () => import('@/views/Home/index.vue'),
      },
      {
        path: '/product',
        component: () => import('@/views/Product/index.vue'),
      },
      {
        path: '/user',
        component: () => import('@/views/User/index.vue'),
      },
      {
        path: '/course',
        component: () => import('@/views/Course/index.vue'),
      },
      {
        path: '/profile',
        component: () => import('@/views/Profile/index.vue'),
      },
    ],
  },
  {
    path: '/orgz/member',
    component: () => import('@/layouts/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/views/SignIn/index.vue'),
      },
      {
        path: 'reg',
        component: () => import('@/views/SignUp/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    // component: () => import('@/views/Exception/NotFound.vue'), // 会报错
    component: () => import('@/views/Exception/index.vue'),
  },
]

export const asyncRoutes = []
