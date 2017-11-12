import Vue from 'vue'
import {getAuthHeader} from '../../utils/auth'

const state = {
  translations: undefined
}

const mutations = {
  SET_CURRENT_TRANSLATIONS (state, translations) {
    state.translations = translations
  }
}

const actions = {
  translate ({ commit }, {text, source, target}) {
    let params = {text: text}
    if (source) {
      params['source'] = source
    }
    if (target) {
      params['target'] = target
    }
    let header = getAuthHeader()
    header['Content-Type'] = 'application/json'
    Vue.http.get(`${__API__}translate`, {params: params, headers: header}).then(
      response => {
        commit('SET_CURRENT_TRANSLATIONS', response.data)
      }
    )
  }
}

const getters = {
  currentTranslations: state => state.translations
}

export default {
  state,
  mutations,
  actions,
  getters
}
