#!/usr/bin/env node

const program = require('commander')
const { startServers } = require('./server')

const defaults = {
    host: 'localhost',
    publishDir: 'dist',
    entrypoint: '__app.html',
    app: `build/bundle.js`,
    spaPort: "5000",
    ssrPort: "5005",
    serveSpa: false,
    serveSsr: false,
}

program
    .option('-d, --debug', 'extra debugging')
    .option('-h, --host [path]', 'host', defaults.host)
    .option('-d, --dist-dir [path]', 'path to distributables', defaults.publishDir)
    .option('-a, --app [path]', 'path from publish dir to app', defaults.app)
    .option('-e, --entrypoint [path]', 'path from publish dir to entrypoint', defaults.entrypoint)
    .option('-b, --serve-spa', 'serve spa', defaults.serveSpa)
    .option('-s, --serve-ssr', 'serve SSR', defaults.serveSsr)
    .option('-B, --spa-port [port]', 'port serving spa app', defaults.spaPort)
    .option('-S, --ssr-port [port]', 'port serving SSR app', defaults.ssrPort)

    .action(_options => {
        const options = _options.opts()
        startServers(options)
    })

program.parse(process.argv)