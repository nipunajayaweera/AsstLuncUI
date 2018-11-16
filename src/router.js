import Vue from 'vue'
import Router from 'vue-router'
import Food from './views/Food.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'food',
      component: Food
    },
    {
      path: '/transport',
      name: 'transport',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Transport.vue')
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('./views/Food.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
