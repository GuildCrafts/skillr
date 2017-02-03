const webSocket = require('socket.io-client')(location.origin)

console.log('websocket file')
webSocket.on('connected', (data) => {
  console.log('webSocket', 'connected', data)
  webSocket.emit('loadAllSkills')
})

webSocket.on('updateSkills', (skills) => {
  console.log('webSocket: updateSkills', skills)
})

webSocket.on('skill update', (update) => {
  console.log('webSocket: skill update', update)
})

webSocket.on('disconnect', (data) => {
  console.log('webSocket', 'disconnect', data)
})


module.exports = webSocket
window.DEBUG = window.DEBUG || {}
window.DEBUG.webSocket = webSocket
