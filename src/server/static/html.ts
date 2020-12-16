import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'
import { promisify } from 'util'
import { bufferHandler } from './buffer';

const readFileAsync = promisify(fs.readFile)

function insertReloadScript(content: string) {
  return content + `<script src="/_server_/reload"></script>`
}

export async function htmlHandler(
  request: IncomingMessage,
  response: ServerResponse,
  filePath: string
) {
  const content = await readFileAsync(filePath, 'utf8')
  const reloadContent = await insertReloadScript(content)
  const buffer = Buffer.from(reloadContent)
  const contentType = 'text/html'
  return bufferHandler(response, { buffer, contentType })
}
