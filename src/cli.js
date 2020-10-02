#!/usr/bin/env node

const program = require('commander')
const { spassr } = require('./server')
const { configent } = require('configent')
const defaults = configent('spassr', require('./config'))

program
    .option('-d, --debug', 'extra debugging')
    .option('-d, --assets-dir <path>', 'path to distributables', defaults.assetsDir.toString())
    .option('-s, --script <path>', 'path to app script', defaults.script)
    .option('-e, --entrypoint <path>', 'path from publish dir to entrypoint', defaults.entrypoint)
    .option('-p, --port <port>', 'port serving spa app', defaults.port.toString())
    .option('-q, --silent', 'silent console logs', defaults.silent)
    .option('-r, --ssr', 'serve SSR', defaults.ssr)
    .action(_options => {
        spassr(_options.opts())
    })

program.parse(process.argv)