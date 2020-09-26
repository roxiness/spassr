#!/usr/bin/env node

const program = require('commander')
const { spassr } = require('./server')
const defaults = require('./config')

program
    .option('-d, --debug', 'extra debugging')
    .option('-h, --host [path]', 'host', defaults.host)
    .option('-d, --assets-dir [path]', 'path to distributables', defaults.assetsDir)
    .option('-a, --app [path]', 'path from publish dir to app', defaults.app)
    .option('-e, --entrypoint [path]', 'path from publish dir to entrypoint', defaults.entrypoint)
    .option('-p, --port [port]', 'port serving spa app', defaults.port)
    .option('-q, --silent', 'silent console logs', defaults.silent)

    .action(_options => {
        spassr(_options.opts())
    })

program.parse(process.argv)