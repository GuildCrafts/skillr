export const initializeMessageHandlers = (connection) => {
  const { on, emit, reportError } = connection

  on('errorOccured', (error) => {
    console.log('webSocket', 'errorOccured', error)
  })

  on('connected', (data) => {
    console.log('webSocket', 'connected', data)
  })

  on('sessionUpdate', (session) => {
    console.log('webSocket: sessionUpdate', session)
  })

  on('updateSkills', (skills) => {
    console.log('webSocket: updateSkills', skills)
  })

  // TMP
  emit('loadAllSkills')
  emit('pretendToBrake')
}
