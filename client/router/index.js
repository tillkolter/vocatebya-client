import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../components/auth/Login'
import CreateVocables from '../views/CreateVocables'
import VocableTest from '../views/VocableTest'
import Translation from '../views/Translation'
import Store from '../store'
import { jwtUpToDate } from '../utils/auth'

Vue.use(Router)

function requireAuth (to, from, next) {
  let lsUser = window.localStorage.getItem('user')
  if (lsUser) {
    let user = JSON.parse(lsUser)
    if (jwtUpToDate(user)) {
      Store.commit('SET_USER', user)
      next()
    } else if (!Store.getters.isAuthenticated) {
      window.location.href = '/login'
    } else {
      next()
    }
  } else if (!Store.getters.isAuthenticated) {
    window.location.href = '/login'
  } else {
    next()
  }
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/vocables/add',
      name: 'add-vocables',
      component: CreateVocables,
      beforeEnter: requireAuth
    },
    {
      path: '/vocables/test',
      name: 'test-vocables',
      component: VocableTest,
      beforeEnter: requireAuth
    },
    {
      path: '/translate',
      name: 'translate',
      component: Translation,
      beforeEnter: requireAuth
    }
  ]
})

export default router
