const webSocket = require('socket.io-client')(location.origin)

webSocket.on('connected', (data) => {
  console.log('webSocket', 'connected', data)
  webSocket.emit('subscribe', {
    resource: 'events'
  })
})

webSocket.on('skills', (skills) => {
  console.log('webSocket: skills', skills)
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
