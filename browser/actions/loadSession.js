import request from '../request'
import state from '../state'
import loadUserData from './loadUserData'

export default function loadSession() {
  return request('get', '/api/session')
    .then(response => {
      const session = response.json
      state.set({
        session,
        loadSessionError: null,
      })
      // if (session.user) loadUserData()
    })
    .catch(loadSessionError => {
      state.set({loadSessionError})
    })
}
