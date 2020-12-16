import { create } from 'lodash';
import * as path from 'path'
import { createReloadServer } from './server'
import { createWatcher } from './watcher'



function run () {
  const root = path.resolve(__dirname, '../example')
  const server = createReloadServer({
    root,
    port: 9100
  })

  createWatcher(root, () => server.reload())
}

run()
