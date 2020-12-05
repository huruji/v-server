import { IncomingMessage, ServerResponse } from 'http'

type Options = {
  status?: number
  contentType?: string
  buffer?: Buffer
}

export async function bufferHandler(response: ServerResponse, options:Options) {
  const { status = 200, contentType = 'text/plain', buffer = Buffer.alloc(0)} = options
  response.setHeader('Content-Type', contentType)
  response.setHeader('Content-Length', buffer.length)
  response.statusCode = status
  response.write(buffer)
  response.end()
}
