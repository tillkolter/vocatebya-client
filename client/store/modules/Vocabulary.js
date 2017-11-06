const state = {
  vocable: undefined,
  vocableHistory: []
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

  }
}

export default {
  state,
  mutations,
  actions
}
