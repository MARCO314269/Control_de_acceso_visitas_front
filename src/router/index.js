import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import RegistroVisita from '@/components/RegistroVisita'
import RegistroVisitantes from '@/components/RegistroVisitantes'
import Control from '@/components/Control'

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
      path: '/visitantes/:id_detalle_visita?',
      name: 'RegistroVisitantes',
      component: RegistroVisitantes,
      props: (route) => ({ id_detalle_visita: route.query.is_detalle_visita })
    },
   // {
     // path: '/control',
     // name: 'Control',
     // component: Control
    //},
  ],
  mode: 'history'
})