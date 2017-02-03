import http from 'http'
import webServer from './webServer'
import { initializeWebSocket } from './webSocket'

export const start = function(port, callback){
  webServer.set('port', port)
  console.log(`http://localhost:${port}/`)
  const webServerInstance = http.createServer(webServer)
  webServerInstance.listen(port, callback)
  initializeWebSocket(webServer, webServerInstance)
  return webServerInstance
}

if (process.env.NODE_ENV !== 'test'){
  start(process.env.PORT || 3000)
}
