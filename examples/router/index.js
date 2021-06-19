import Vue from 'vue'
import VueRouter from "vue-router";
import button from '../docs/button.md'
import install from '../docs/installl'
import start from '../docs/start'
import input from '../docs/input'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component:  install
    },
    {
      path: '/start',
      component: start
    },
    {
      path: '/button',
      component: button
    },
    {
      path: '/input',
      component: input
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})