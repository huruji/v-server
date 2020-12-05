import { createServer, Server } from 'http'
import { staticFileHandler } from './static'


type ServerOptions = {
  port?: number
  root?: string
}
class ServerHandle {
  constructor(private server: Server){}
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
      default:
        return staticFileHandler(root, request, response)
    }
  }).listen(port))
}
