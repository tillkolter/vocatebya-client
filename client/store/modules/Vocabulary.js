import Vue from 'vue'
import {getAuthHeader} from '../../utils/auth'
import store from '../../store'

const state = {
  vocable: undefined,
  vocableHistory: [],
  vocableError: undefined
}

const mutations = {
  SET_VOCABLE (state, vocable) {
    state.vocable = vocable
  }
}

const actions = {
  getVocable ({ commit }, pk) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  nextVocable ({commit}) {

  },
  createVocable ({commit}, data) {
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    Vue.http.post(`${__API__}/api/v1/vocable`, data, {headers: headers}).then(
      response => {
        let rspData = response.data
        console.log(`${JSON.stringify(rspData)} data`)
      }
    ).catch(
      err => {
        let response = err.response
        if (response.status === 422) {
          store.commit('ADD_ALERT', {message: 'Vocable already exists.', level: 'warn'})
        }
      }
    )
  }
}

export default {
  state,
  mutations,
  actions
}
