import path from 'path'
import express from 'express'
import morgan from 'morgan'
import '../environment'
import logger from '../logger'
import authentication from './authentication'
import webSocket from '../webSocket'

const publicPath = path.resolve(__dirname, '../../public')
const webServer = express()

webServer.use(morgan('dev', { "stream": logger.stream }))

webServer.use(express.static(publicPath))

authentication(webServer)

webServer.get('/*', (req, res, next) => {
  if (req.xhr) return next()
  res.sendFile(publicPath+'/index.html')
});

webServer.use((error, req, res) => {
  res.status(404)
  res.send('')
})

export default webServer

