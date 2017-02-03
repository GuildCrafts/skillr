import SocketIO from 'socket.io'
import SocketIORedis from 'socket.io-redis'
import logger from '../logger'
import { sessionMiddleware } from '../webServer/authentication'
import Connection from './connection'

export const initializeWebSocket = (server, httpServer) => {
  const io = new SocketIO(httpServer)
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
  })
  io.use(loadCurrentUser)
  io.on('connection', initializeConnection)
}

const loadCurrentUser = function(socket, done){
  const session = socket.request.session
  socket.session = session
  done()
  // const currentUserGithubId = (
  //   session &&
  //   session.passport &&
  //   session.passport.user &&
  //   session.passport.user.github_id
  // )

  // if (currentUserGithubId){
  //   new Queries().getUserByGithubId(session.passport.user.github_id)
  //     .then(user => {
  //       socket.user = user
  //       done()
  //     })
  // } else {
  //   socket.user = null
  //   done()
  // }
}


const initializeConnection = function(socket){
  let { session, user, commands, queries } = socket

  logger.info('socket connection initialized', { session, user })

  const on = (eventType, handler) => {
    socket.on(eventType, payload => {
      logger.info(`SERVER SOCKET RCV "${eventType}"`)
      logger.silly(JSON.stringify({eventType, payload}))
      return handler(payload)
    })
  }

  const emit = (eventType, payload) => {
    logger.info(`SERVER SOCKET EMIT "${eventType}"`)
    logger.silly(JSON.stringify({eventType, payload}))
    socket.emit(eventType, payload)
  }

  const broadcast = (eventType, payload) => {
    logger.info(`SERVER SOCKET BROADCAST "${eventType}"`)
    logger.silly(JSON.stringify({eventType, payload}))
    socket.broadcast.emit(eventType, payload)
  }

  const broadcastToAll = (type, prrr) => {
    emit(type, prrr)
    broadcast(type, prrr)
  }

  const reportError = (context, error) => {
    error = Object.assign({}, error, {
      context,
      message: error.message,
      stack: error.stack,
    })
    emit('errorOccured', {error})
  }

  initializeMessageHandlers(on, emit, broadcast, broadcastToAll, reportError)

  emit('sessionUpdate', { user })
}


const initializeMessageHandlers = (on, emit, broadcast, broadcastToAll, reportError) => {

  on('loadAllSkills', payload => {
    emit('updateSkills', {
      0: {id: 0},
      1: {id: 1},
      2: {id: 2},
    })
  })

}
