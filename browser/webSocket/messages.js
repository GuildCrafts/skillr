import logger from '../logger'
import state from '../state'

export const initializeMessageHandlers = (connection) => {
  const { on, emit, reportError } = connection

  on('sessionUpdate', (session) => {
    console.log('webSocket: sessionUpdate', session)
    state.set({session})
    if (session && session.user){
      emit('loadAllSkills')
    }
  })

  on('updateSkills', (updatedSkills) => {
    console.log('webSocket: updateSkills', updatedSkills)
    const skills = state.get().skills || {}
    updatedSkills.forEach(skill => { skills[skill.id] = skill })
    state.set({skills})
  })

}
