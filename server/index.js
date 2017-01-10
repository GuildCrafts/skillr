require('dotenv').load()
const NODE_ENV = process.env.NODE_ENV

import path from 'path'
import http from 'http'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
// import cookieSession from 'cookie-session'
import session from 'express-session'

const publicPath = path.resolve(__dirname, '../public')
const server = express()

if (NODE_ENV !== 'test'){
  server.use(logger('dev')) // log to STDOUT unless in test
}

server.sessionOptions = {
  name: 'session',
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000,
  },
}

if (NODE_ENV === 'production'){
  server.set('trust proxy', 1) // trust first proxy
  server.sessionOptions.cookie.secure = true
}

server.sessionMiddleware = session(server.sessionOptions)
server.use(server.sessionMiddleware)

// server.use(cookieSession({
//   name: 'session',
//   keys: [process.env.SESSION_KEY]
// }))
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(publicPath))
server.use(bodyParser.json({extended: true}))

server.use(require('./authentication'))
// server.use('/rpc', require('./rpc'))
// server.use('/api', require('./api'))

server.get('/*', (req, res, next) => {
  if (req.xhr) return next()
  res.sendFile(publicPath+'/index.html')
});


server.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});


server.start = function(port=process.env.PORT, callback){
  server.set('port', port)
  console.log(`http://localhost:${port}/`)
  const httpServer = http.createServer(server)
  require('./webSocket')(server, httpServer)
  httpServer.listen(port, callback)
  return httpServer
}


if (NODE_ENV !== 'test') {
  server.start()
}

export default server
