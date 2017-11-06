import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true  // created computed members from your variable declarations
})

Vue.http = Vue.prototype.$http = axios

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
