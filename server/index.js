require('dotenv').load()

import path from 'path'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieSession from 'cookie-session'

const publicPath = path.resolve(__dirname, '../public')
const server = express()
server.set('port', process.env.PORT || '3000')

if (process.env.NODE_ENV !== 'test') server.use(logger('dev'))
server.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}))
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(publicPath))
server.use(bodyParser.json({extended: true}))

server.use(require('./authentication'))
server.use('/api', require('./api'))

server.get('/session', (request, response) => {
  response.json({
    user: request.session.passport.user
  })
});

server.get('/*', (req, res, next) => {
  if (req.xhr) return next()
  res.sendFile(publicPath+'/index.html')
});


server.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});




if (process.env.NODE_ENV !== 'test'){
  console.log('http://localhost:'+server.get('port')+'/')
  server.listen(server.get('port'))
}

export default server
