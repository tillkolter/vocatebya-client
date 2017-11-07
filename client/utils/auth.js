import Vue from 'vue'

export const jwtUpToDate = (jwt) => {
  let exp = jwt['exp']
  if (exp) {
    let expMs = exp * 1000
    let in30Secs = Date.now() + 30 * 1000
    let expirationDate = new Date(expMs)
    return expirationDate > new Date(in30Secs)
  } else {
    return true
  }
}

export const getAuthHeader = () => {
  let token = Vue.ls.get('jwt')
  let header = {}
  if (token) {
    header['Authorization'] = `JWT ${token}`
  }
  return header
}
