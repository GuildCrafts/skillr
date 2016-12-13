import request from '../request'
import state from '../state'

export default function loadUserData() {
  return request('get', '/api/user-data')
    .then(response => {
      const {rankings, hiddenSkills} = response.json
      state.set({
        rankings,
        hiddenSkills,
        loadUserDataError: null,
      })
    })
    .catch(loadUserDataError => {
      state.set({loadUserDataError})
    })
}
