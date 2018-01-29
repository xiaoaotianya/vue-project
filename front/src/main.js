import Vue from 'vue'
import App from './App.vue';
import iView from 'iview';
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'iview/dist/styles/iview.css';
import {routes} from './routes';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {store} from './state/index'
import cookie from 'vue-cookie'
Vue.use(VueQuillEditor)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(iView);
Vue.use(cookie)
const router=new VueRouter({
  routes:routes,
  mode:'hash'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})