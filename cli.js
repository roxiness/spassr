#!/usr/bin/env node

const program = require('commander')
const { spassr } = require('./server')
const defaults = require('./config')

program
    .option('-d, --debug', 'extra debugging')
    .option('-h, --host <path>', 'host', defaults.host)
    .option('-d, --assets-dir <path>', 'path to distributables', defaults.assetsDir.toString())
    .option('-s, --script <path>', 'path to app script', defaults.script)
    .option('-e, --entrypoint <path>', 'path from publish dir to entrypoint', defaults.entrypoint)
    .option('-p, --port <port>', 'port serving spa app', defaults.port.toString())
    .option('-t, --timeout <number>', 'max time for a page to render', defaults.timeout.toString())
    .option('-q, --silent', 'silent console logs', defaults.silent)
    .option('-r, --ssr', 'serve SSR', defaults.ssr)

    .action(_options => {
        spassr(_options.opts())
    })

program.parse(process.argv)