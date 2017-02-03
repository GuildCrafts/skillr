const webSocket = require('socket.io-client')(location.origin)

webSocket.on('errorOccured', (error) => {
  console.log('webSocket', 'errorOccured', error)
})

webSocket.on('connected', (data) => {
  console.log('webSocket', 'connected', data)
})

webSocket.on('sessionUpdate', (session) => {
  console.log('webSocket: sessionUpdate', session)
})

webSocket.on('updateSkills', (skills) => {
  console.log('webSocket: updateSkills', skills)
})

// TMP
webSocket.emit('loadAllSkills')
webSocket.emit('pretendToBrake')

// module.exports = webSocket

// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.webSocket = webSocket
