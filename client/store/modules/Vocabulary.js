import Vue from 'vue'
import {getAuthHeader} from '../../utils/auth'
import store from '../../store'

const state = {
  vocable: undefined,
  vocableHistory: [],
  vocableError: undefined,
  wordTypes: undefined,
  currentTestVocable: undefined,
  testVocableHistory: [],
  currentResultStatus: undefined,
  loadingTest: false,
  vocableTest: undefined
}

const mutations = {
  SET_VOCABLE (state, vocable) {
    state.currentVocable = vocable
  },
  SET_WORD_TYPES (state, wordTypes) {
    state.wordTypes = wordTypes
  },
  SET_CURRENT_TEST_VOCABLE (state, vocable) {
    state.currentTestVocable = vocable
    state.testVocableHistory.push(vocable)
  },
  RESET_VOCABLE_TEST (state) {
    state.testVocableHistory = []
  },
  SET_CURRENT_RESULT_STATUS (state, status) {
    state.currentResultStatus = status
  },
  SET_LOADING_TEST (state, loading) {
    state.loadingTest = loading
  },
  SET_VOCABLE_TEST (state, test) {
    state.vocableTest = test
    state.currentTestVocable = test.next_vocable
  }
}

const actions = {
  createVocable ({commit}, data) {
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    Vue.http.post(`${__API__}vocable`, data, {headers: headers}).then(
      () => {
        store.commit('ADD_ALERT', {message: 'Die Vokabel wurde hinzu gefügt.', level: 'info'})
      }
    ).catch(
      err => {
        let response = err.response
        if (response.status === 422) {
          store.commit('ADD_ALERT', {message: 'Die Vokabel existiert bereits.', level: 'warn'})
        }
      }
    )
  },
  getWordTypes ({commit}) {
    Vue.http.get(`${__API__}word/types`).then(
      response => {
        let data = response.data
        commit('SET_WORD_TYPES', data)
      }
    )
  },
  nextVocable ({commit}) {
    commit('SET_CURRENT_RESULT_STATUS', null)
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    Vue.http.post(`${__API__}vocable/next`, {}, {headers: headers}).then(
      response => {
        let data = response.data
        if (data && data.length > 0) {
          commit('SET_CURRENT_TEST_VOCABLE', data[0])
        }
        commit('SET_LOADING_TEST', false)
      }
    ).catch(() => {
      commit('SET_LOADING_TEST', false)
    })
  },
  nextTestVocable ({commit}) {
    commit('SET_CURRENT_RESULT_STATUS', null)
    let testId = store.getters.currentVocableTest.id
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    Vue.http.post(`${__API__}vocable-test/${testId}/next-vocable`, {}, {headers: headers}).then(
      response => {
        let data = response.data
        if (data) {
          commit('SET_CURRENT_TEST_VOCABLE', data)
        }
        commit('SET_LOADING_TEST', false)
      }
    ).catch(() => {
      commit('SET_LOADING_TEST', false)
    })
  },
  startVocableTest ({commit}) {
    commit('SET_LOADING_TEST', true)
    commit('RESET_VOCABLE_TEST')
    store.dispatch('nextVocableTest')
  },
  solveVocableTranslation ({commit}, {id, translation, testId}) {
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    let data = {solution: {translation: translation}, vocable: id, user: 1}
    Vue.http.post(`${__API__}vocable-answer`, data, {headers: headers}).then(
      response => {
        let status = response.data.status
        commit('SET_CURRENT_RESULT_STATUS', status)
      }
    )
  },
  nextVocableTest ({commit}) {
    let headers = getAuthHeader()
    headers['Content-Type'] = 'application/json'
    Vue.http.post(`${__API__}vocable-test/next`, {}, {headers: headers}).then(
      response => {
        let data = response.data
        if (data) {
          commit('SET_VOCABLE_TEST', data)
        }
      }
    )
  }
}

const getters = {
  currentVocable: state => state.currentVocable,
  currentTestVocable: state => state.currentTestVocable,
  currentVocableTest: state => state.vocableTest,
  wordTypes: state => {
    if (state.wordTypes) return state.wordTypes
    else {
      store.dispatch('getWordTypes')
    }
  },
  loadingTest: state => state.loadingTest,
  currentResultStatus: state => state.currentResultStatus
}

export default {
  state,
  mutations,
  actions,
  getters
}
