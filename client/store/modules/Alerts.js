const state = {
  alerts: []
}

const mutations = {
  ADD_ALERT (state, alert) {
    console.log('add alert')
    state.alerts.push(alert)
  }
}

const actions = {
}

const getters = {
  alerts: state => state.alerts
}

export default {
  state,
  mutations,
  actions,
  getters
}
