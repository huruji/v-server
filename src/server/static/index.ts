import { ServerResponse, IncomingMessage } from 'http'
import * as path from 'path'
import { getFileInfo } from './fileInfo'
import { htmlHandler } from './html'
import { notfundHanlder } from './not-found'
import { fileHandler } from './file'

export async function staticFileHandler(root: string, request: IncomingMessage, response: ServerResponse) {
  const resourcePath = decodeURI(request.url)
  const filePath = path.resolve(path.join(root, resourcePath))
  const rootPath = path.resolve(root)

  if (filePath.indexOf(rootPath) !== 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`${request.url} is not found!`);
    return
  }
  const info = await getFileInfo(filePath)
  switch (info.type) {
    case 'not-found':
      notfundHanlder(response, request.url)
      return;
    case 'html':
      return htmlHandler(request, response, filePath)
    case 'file':
      return fileHandler(response, info)
  }

}
