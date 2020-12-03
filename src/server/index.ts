import { createServer, Server } from 'http'

class ServerHandle {
  constructor(private server: Server){}
}


export function createReloadServer() {
  return new ServerHandle(createServer((request, response) => {
    if (!request.method || request.method.toLocaleLowerCase() !== 'get') {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`${request.url} is not found!`);
    }
  }).listen(8000))
}
