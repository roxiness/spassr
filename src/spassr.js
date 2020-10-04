const { tossr } = require('tossr')
const { resolve } = require('path')
const { configent } = require('configent')
const express = require('express')
const config = require('./config')

/** 
 * @param {Partial<config.Config>} options 
 **/
module.exports.spassr = async function (options) {
    options = configent('spassr', require('./config'), options)

    let {
        assetsDir,
        port,
        silent,
        ssr,
        entrypoint,
        script,
        ssrOptions = {}
    } = options

    if (!await isPortFree(port)) {
        console.log(`[spassr] port already taken ${port}`)
        return
    }

    const server = express();

    const assetsDirs = Array.isArray(assetsDir) ? assetsDir : assetsDir.split(',')
    assetsDirs.forEach(dir => server.use(express.static(dir)))

    if (!ssr)
        server.get('*', (req, res) =>
            res.sendFile(resolve(entrypoint)))
    else
        server.get('*', async (req, res) =>
            res.send(await tossr(entrypoint, script, req.url, ssrOptions)))

    if (!silent) console.log(`[spassr] Serving ${ssr ? 'ssr' : 'spa'} on localhost:${port}`)
    return server.listen(port)
}


function isPortFree(port) {
    return new Promise((resolve, reject) => {
        const tester = require('net').createServer()
            .once('error', err => (err['code'] == 'EADDRINUSE' ? resolve(false) : reject(err)))
            .once('listening', () => tester.once('close', () => resolve(true)).close())
            .listen(port)
    })
} 