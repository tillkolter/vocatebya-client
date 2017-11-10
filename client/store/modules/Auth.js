import Vue from 'vue'
import jwt from 'jsonwebtoken'
import { jwtUpToDate } from '../../utils/auth'

const state = {
  user: undefined
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

const actions = {
  login ({commit}, credentials) {
    Vue.http.post(
      `${__API__}api-token-auth/login/`,
      credentials,
      { headers: { 'Content-Type': 'application/json' } }
    ).then(
      ({data}) => {
        let token = data.token
        console.log(JSON.stringify(token))
        let decodedUser = jwt.decode(token)
        if (jwtUpToDate(decodedUser)) {
          commit('SET_USER', {
            isAuthenticated: true,
            username: decodedUser.username
          })
          Vue.ls.set('user', JSON.stringify(decodedUser))
          Vue.ls.set('jwt', token)
        }
        console.log(JSON.stringify(JSON.stringify(decodedUser)))
      }
    )
  }
}

const getters = {
  isAuthenticated: (state) => {
    return state.user && state.user.isAuthenticated
  },
  userName: state => state.user && state.user.username
}

export default {
  state,
  mutations,
  actions,
  getters
}
