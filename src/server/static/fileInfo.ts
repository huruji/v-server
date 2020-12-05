import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { mime as getMime } from './mime'

const existsAsync = promisify(fs.exists)
const statAsync = promisify(fs.stat)

export async function getFileInfo(filePath: string) {
  const name = path.basename(filePath)
  const exists = await existsAsync(filePath)
  if (!exists) {
    const type = 'not-found'
    const mime = 'application/octet-stream'
    const size = 0
    return { type, size, name, path, mime }
  }

  const info = await statAsync(filePath)

  if (info.isDirectory()) {
    const type = 'directory'
    const mime = 'application/octet-stream'
    const size = 0
    return { type, size,  name, path, mime }
  } else if(info.isFile()) {
    const size = info.size
    const mime = getMime(filePath)
    const type = mime === 'text/html' ? 'html' : 'file'
    return { type, size, name, path, mime }
  } else {
    const type = 'not-found'
    const mime = 'application/octet-stream'
    const size = 0
    return { type, size, name, path, mime }
  }
}
