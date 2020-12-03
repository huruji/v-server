#!/usr/bin/env node
import('v8-compile-cache')
import program from 'commander'


program
    .usage('<commander> <usage>')
    .command('start')
    .description('start server')
    .option('--port <port>')
    .action(async (opt) => {
      if (opt.port) opt.watch = true
      if (opt.config) opt.configFile = opt.config
      const wpc = new Compiler(opt)
      await wpc.run()
    })

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)

process.on('unhandledRejection', (error) => {
  console.error(error)
  process.exit(1)
})