#!/usr/bin/env node

const program = require('commander')
const { spassr } = require('./server')
const { defaults } = require('./config')

program
    .option('-d, --debug', 'extra debugging')
    .option('-h, --host [path]', 'host', defaults.host)
    .option('-d, --dist-dir [path]', 'path to distributables', defaults.distDir)
    .option('-a, --app [path]', 'path from publish dir to app', defaults.app)
    .option('-e, --entrypoint [path]', 'path from publish dir to entrypoint', defaults.entrypoint)
    .option('-b, --serve-spa', 'serve spa', defaults.serveSpa)
    .option('-s, --serve-ssr', 'serve SSR', defaults.serveSsr)
    .option('-B, --spa-port [port]', 'port serving spa app', defaults.spaPort)
    .option('-S, --ssr-port [port]', 'port serving SSR app', defaults.ssrPort)
    .option('-q, --silent', 'port serving SSR app', defaults.silent)

    .action(_options => {
        const options = _options.opts()
        spassr(options)
    })

program.parse(process.argv)