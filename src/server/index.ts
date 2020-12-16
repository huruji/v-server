import { createServer, Server } from 'http'
import { staticFileHandler } from './static'
import { reloadHanlder, signalHandler, signalReload, } from './static/reload'


type ServerOptions = {
  port?: number
  root?: string
}
class ServerHandle {
  constructor(private server: Server){}
  public reload() {
    signalReload()
  }
}


export function createReloadServer(options: ServerOptions = {
  port: 8000,
  root: process.cwd()
}) {
  const { port = 8000, root } = options
  return new ServerHandle(createServer((request, response) => {
    if (!request.method || request.method.toLocaleLowerCase() !== 'get') {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`${request.url} is not found!`);
      return
    }
    switch (request.url) {
      case '/_server_/reload':
        return reloadHanlder(response)
      case '/_server_/signal':
        return signalHandler(response)
      default:
        return staticFileHandler(root, request, response)
    }
  }).listen(port))
}
