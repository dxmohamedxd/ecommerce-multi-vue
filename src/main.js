// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from "vuejs-paginate-next";
import './assets/css/font.css'
import './assets/css/style.css'
import './assets/css/responsives.css'


// const i18n = new VueI18n({
//   locale: 'ar',
//   fallbackLocale: 'en',
//   messages: {
//     ar: {
//       title: 'مرحبا',
//     },
//     en: {
//       title: 'Hello World',
//     },
//   },
// });
// Vue.use(VueI18n)
createApp(App)
  .use(router)
  .use(store)
  .use(Paginate)
  .mount('#app')





