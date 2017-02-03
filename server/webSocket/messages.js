import Queries from '../queries'
import Commands from '../commands'

export const initializeMessageHandlers = (connection) => {
  const {on, emit, broadcast, reportError, user, session} = connection

  const queries = new Queries(user)
  // const commands = new Commands(session.user)

  on('loadAllSkills', payload =>
    queries.allSkills().then(allSkills => {
      emit('updateSkills', allSkills)
    })
  )

  on('pretendToBrake', payload => {
    return Promise.reject(new Error('omg im broken... oh no'))
  })

}
