import SocketIOClient from 'socket.io-client'
import logger from '../logger'
import { initializeMessageHandlers } from './messages'

const socket = SocketIOClient(location.origin)

const reportError = (context, error) => {
  console.log('ERROR CONTEXT:', context)
  console.error(error)
  logger.error(error)
}

const on = (eventType, handler) => {
  socket.on(eventType, payload => {
    logger.info(`BROWSER SOCKET RCV "${eventType}"`)
    // logger.debug({eventType, payload})
    try{
      handler(payload)
    }catch(error){
      reportError(`error on "${eventType}"`, error)
    }
  })
}

export const emit = (eventType, payload) => {
  logger.info(`BROWSER SOCKET EMIT "${eventType}"`)
  logger.debug(JSON.stringify({eventType, payload}))
  socket.emit(eventType, payload)
}


on('errorOccured', (error) => {
  reportError(error.context, error)
})

initializeMessageHandlers({ reportError, on, emit })
// module.exports = webSocket

// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.socket = socket
