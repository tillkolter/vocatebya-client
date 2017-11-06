import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../components/auth/Login'
import Store from '../store'
import { jwtUpToDate } from '../utils/auth'

Vue.use(Router)

function requireAuth (to, from, next) {
  let lsUser = Vue.ls.get('user')
  if (lsUser) {
    let user = JSON.parse(lsUser)
    if (user && jwtUpToDate(user)) {
      Store.commit('SET_USER', user)
    }
  }
  if (!Store.getters.isAuthenticated) {
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
    }
  ]
})

export default router
