import { createRouter, createWebHashHistory } from 'vue-router'

import userRoutes from '@/modules/user/routes'
import cartRoutes from '@/modules/cart/routes'
import productRoutes from '@/modules/product/routes'
import DashboardRoutes from '@/modules/dashboard/routes';

import swal from 'sweetalert';

const routes = [
  ...cartRoutes,
  ...productRoutes,
  ...userRoutes,
 ...DashboardRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log({fromPath: from?.path, toPath: to?.path})


  if(to?.path == '/login' || to?.path == '/register' || to?.path  == "/category" || to?.path  == "/dashboard"  ||to?.path  == "/CategoryDashboard"  || to?.path == "/loginDahboard") {
    return next()
  }

  if(!localStorage["token"]) {

    // TODO: use sweet alert libarary
    // alert("You are not authorized! - login first")
  swal("You are not authorized! - login first");
    next('/login');
  }
  else if(to.path == '/' && from.path == '/login') {
    // swal("welcome user");
    next();
    // alert(`Welcome User`);
    // TODO: use sweet alert libarary
  }
  else next();

})

export default router
