import { ServerResponse, Server } from 'http'
import * as fs from 'fs'
import * as path from 'path'
import { bufferHandler } from './buffer'
import { uuid } from './uuid'

const clients = new Map<string, ServerResponse>()

export function reloadHanlder(response: ServerResponse) {
  const buffer = Buffer.from(fs.readFileSync(path.resolve(__dirname, './template/reload.ts')))
  bufferHandler(response, {
    buffer,
    contentType: 'text/javascript'
  })
}


export function signalHandler(response: ServerResponse) {
  response.setHeader('Connection', 'Transfer-Encoding')
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.setHeader('Transfer-Encoding', 'chunked')
  response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.setHeader('Pragma', 'no-cache')
  response.setHeader('Expires', 0)
  response.statusCode = 200
  response.write('established')
  const clientid = uuid()
  clients.set(clientid, response)
  response.on('close', () => clients.delete(clientid))
}

export function signalReload() {
  for (const key of clients.keys()) {
    const client = clients.get(key)
    client?.write('reload')
  }
}
