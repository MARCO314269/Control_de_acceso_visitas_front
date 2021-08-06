import Vue from 'vue'
import Router from 'vue-router'

import RegistroVisita from '@/components/RegistroVisita'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/visitas',
      name: 'RegistroVisita',
      component: RegistroVisita
    },
  ],
  mode: 'history'
})
