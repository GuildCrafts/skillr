import request from '../request'
import state from '../state'

export default function loadSession() {
  return request('get', '/session')
    .then(session => {
      state.set({session})
    })
    .catch(error => {

    })
}
