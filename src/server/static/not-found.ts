import { ServerResponse } from 'http'
import { bufferHandler } from './buffer'

export async function notfundHanlder(response: ServerResponse, resourcePath: string) {
  bufferHandler(response, {
    status: 404,
    contentType: 'text/plain',
    buffer: Buffer.from(`${resourcePath} is not found!`)
  })
}
