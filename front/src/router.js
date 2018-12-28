import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('./views/Category.vue')
    },
    {
      path: '/bookdetail/:id',
      name: 'bookdetail',
      component: () => import('./views/BookDetail.vue')
    },
    {
      path: '/reader/:id',
      name: 'reader',
      component: () => import('./views/Reader.vue')
    }
  ]
})
