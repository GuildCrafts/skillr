import SocketIO from 'socket.io'
import queries from './queries'
import SocketIORedis from 'socket.io-redis'

module.exports = (server, httpServer) => {
  const webSocket = server.webSocket = new SocketIO(httpServer)

  webSocket.adapter(
    SocketIORedis({
      host: 'localhost',
      port: 6379,
    })
  )

  webSocket.use(function(socket, next) {
    server.sessionMiddleware(socket.request, socket.request.res, next)
  })

  webSocket.use(function(socket, next) {
    // server.sessionMiddleware(socket.request, socket.request.res, next)
    // console.log('SOCKET', socket)
    next()
  })

  webSocket.on('connection', function(socket){
    console.log('Web Socket: connection')

    socket.on('disconnect', function(){
      console.log('Web Socket: disconnected')
    })

    socket.on('load skills', function(data){
      queries.skills().then(skills => {
        socket.emit('skills', skills)
      })
    })

    socket.on('update skill', function(updates){
      console.log('update skill', updates)
      socket.broadcast.emit('skill update', updates);
    })

    socket.on('subscribe', function(data){
      const session = socket.request.session
      console.log('Web Socket: subscribe', data)
      session.subscriptions = session.subscriptions || []
      if (!session.subscriptions.includes(data.resource))
        session.subscriptions.push(data.resource)
    })

    socket.emit('connected', {
      connectedAt: new Date,
      session: socket.request.session,
      user: socket.request.user,
    })
  })

  return webSocket
}
