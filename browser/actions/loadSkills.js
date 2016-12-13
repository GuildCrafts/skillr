import request from '../request'
import state from '../state'

export default function loadSkills() {
  return request('get', '/api/skills')
    .then(response => {
      state.set({
        skills: response.json,
        loadSkillsError: null,
      })
    })
    .catch(loadSkillsError => {
      state.set({loadSkillsError})
    })
}
