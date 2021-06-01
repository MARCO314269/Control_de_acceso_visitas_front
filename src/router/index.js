import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import RegistroVisita from '@/components/RegistroVisita'
import RegistroVisitantes from '@/components/RegistroVisitantes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home
    },
    {
      path: '/visitas',
      name: 'RegistroVisita',
      component: RegistroVisita
    },
    {
      path: '/visitantes',
      name: 'RegistroVisitantes',
      component: RegistroVisitantes
    },
  ],
  mode: 'history'
})