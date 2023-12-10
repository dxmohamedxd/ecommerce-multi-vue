export default [
  {
    path: '/lang',
    name: 'lang',
    component: () => import(/* webpackChunkName: "about" */ '../pages/ar.vue')
  },
   {
    path: '/lang',
    name: 'lang',
    component: () => import(/* webpackChunkName: "about" */ '../pages/en.js')
  },

]
