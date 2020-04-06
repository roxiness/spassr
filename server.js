const express = require('express')
const { ssr } = require('@sveltech/ssr')
const path = require('path')

module.exports.startServers = function (options) {
    const { spaPort, ssrPort, serveSpa, serveSsr } = { ...options }
    
    options.host = `http://${options.host}`
    options.app = path.resolve(options.distDir, options.app)
    options.entrypoint = path.resolve(options.distDir, options.entrypoint)
    

    if (serveSpa) startServer({ ...options, port: spaPort, mode: 'spa' })
    if (serveSsr) startServer({ ...options, port: ssrPort, mode: 'ssr' })
}

function startServer(options) {
    const { distDir, host, port, mode } = options
    const app = express()
    const fallback = mode === 'ssr' ? sendSSRRender : sendEntryPoint

    app.use(express.static(distDir))
    app.get('*', fallback.bind({ options }))
    console.log(`Serving ${mode} on ${host}:${port}`)
    app.listen(port)
}

async function sendEntryPoint(req, res) {
    const { entrypoint } = this.options
    res.sendFile(entrypoint)
}
async function sendSSRRender(req, res) {
    const { entrypoint, app, host } = this.options
    res.send(await ssr(entrypoint, app, req.url, { host }))
}