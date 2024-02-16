import Vue from 'vue'
import VueRouter from 'vue-router'

import ImportList from '../views/employee/ImportList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ImportList',
    component: ImportList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
