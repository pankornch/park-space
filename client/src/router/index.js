import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main'
import admin from '../views/admin/admin'
import view from '../views/view'
import login from '../views/admin/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: main,

  },
  {
    path: '/admin',
    name: 'adminPage',
    component: admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import("../views/test")
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      requiresTest: true
    }
  },
  {
    path: '/:id',
    name: 'view',
    component: view
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;