import { ServerResponse } from 'http'
import { createReadStream } from 'fs'
import { FileInfo } from './fileInfo'



export async function fileHandler(response: ServerResponse, fileInfo: FileInfo) {
  const { mime, path, size } = fileInfo
  const readable = createReadStream(path)
  response.statusCode = 200
  response.setHeader('Content-Type', `${mime}`)
  response.setHeader('Content-Length', size)
  readable.pipe(response)
}
