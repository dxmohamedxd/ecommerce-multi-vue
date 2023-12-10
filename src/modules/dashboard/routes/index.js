export default[
  {
    path:"/dashboard",
    name:"dashboard",
    component: () => import(/* webpackChunkName: "register" */ '../pages/dashboard.vue')
  },
  {
    path: '/newproduct',
    name: 'newProduct',
    component: () => import(/* webpackChunkName: "category" */ '../pages/newProduct.vue')
  },

  {
    path: '/loginDahboard',
    name: 'loginDahboard',
    component: () => import(/* webpackChunkName: "category" */ '../pages/loginDashboard.vue')
  },
  {
    path: '/CategoryDashboard',
    name: 'CategoryDashboard',
    component: () => import(/* webpackChunkName: "category" */ '../pages/category.vue')
  },
]
