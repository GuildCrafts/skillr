import request from '../request'
import state from '../state'

export default function loadSession() {
  return request('get', '/api/session')
    .then(response => {
      state.set({
        session: response.body
      })
    })
    .catch(sessionloadError => {
      state.set({sessionloadError})
    })
}
