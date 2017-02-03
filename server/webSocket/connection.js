import logger from '../logger'

export default class WebSocketConnection {

  constructor(socket, session){
    logger.silly('new WebSocketConnection')
    this.socket = socket
    this.session = session
  }

  on(eventType, handler){
    this.socket.on(eventType, payload => {
      logger.info(`SERVER SOCKET RCV "${eventType}"`)
      logger.silly(JSON.stringify({eventType, payload}))
      return handler(payload)
    })
  }

  emit(eventType, payload){
    logger.info(`SERVER SOCKET EMIT "${eventType}"`)
    logger.silly(JSON.stringify({eventType, payload}))
    this.socket.emit(eventType, payload)
  }

  broadcast(eventType, payload){
    logger.info(`SERVER SOCKET BROADCAST "${eventType}"`)
    logger.silly(JSON.stringify({eventType, payload}))
    this.socket.broadcast.emit(eventType, payload)
  }

  broadcastToAll(type, prrr){
    this.emit(type, prrr)
    this.broadcast(type, prrr)
  }

  reportError(context, error){
    error = Object.assign({}, error, {
      context,
      message: error.message,
      stack: error.stack,
    })
    this.emit('errorOccured', {error})
  }

}
