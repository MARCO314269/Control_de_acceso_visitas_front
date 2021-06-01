import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueRouter from 'vue-router'

import VModal from 'vue-js-modal'
import router from './router'
import store from './store'

/*Vue.config.productionTip = false*/

Vue.use(VModal)
Vue.use(VueRouter, router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

/*axios.defaults.baseURL = process.env.VUE_APP_URL*/

new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')