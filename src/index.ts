import { create } from 'lodash';
import * as path from 'path'
import { createReloadServer } from './server'

createReloadServer({
  root: path.resolve(__dirname, '../example')
})
