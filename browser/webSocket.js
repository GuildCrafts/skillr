const webSocket = require('socket.io-client')(location.origin)

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

// module.exports = webSocket

// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.webSocket = webSocket
