const express = require('express')
const { ssr } = require('@sveltech/ssr')
const path = require('path')
const ssrApp = express()
const app = express()

const host = process.env.HOST || 'http://localhost'
const { PORT = 5000 } = process.env
const SSR_PORT = process.env.SSR_PORT || (PORT + 1)
const distDir = path.resolve('../../dist')
const ssrScript = `${distDir}/build/bundle.js`
const entrypoint = `${distDir}/__app.html`



startServer(app, sendEntryPoint, 'SPA only', PORT)
startServer(ssrApp, sendSSRRender, 'SPA & SSR', SSR_PORT)

function startServer(app, fallback, name, port) {
    app.use(express.static(distDir))
    app.get('*', fallback)
    console.log(`Serving ${name} on ${host}:${port}`)
    app.listen(port)
}

async function sendEntryPoint(req, res) { res.sendFile(entrypoint) }
async function sendSSRRender(req, res) {
    res.send(await ssr(entrypoint, ssrScript, req.url, { host }))
}