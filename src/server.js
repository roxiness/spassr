const express = require('express')
const { tossr } = require('tossr')
const config = require('./config')
const { resolve } = require('path')
const { configent } = require('configent')

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

    if (!Array.isArray(assetsDir)) {
        /** @type {string[]} */
        (assetsDir) = assetsDir.split(',')
    }

    const server = express();
    assetsDir.forEach(dir => server.use(express.static(dir)))

    if (!ssr)
        server.get('*', (req, res) =>
            res.sendFile(resolve(entrypoint)))
    else
        server.get('*', async (req, res) =>
            res.send(await tossr(entrypoint, script, req.url, ssrOptions)))

    if (!silent) console.log(`[spassr] Serving ${ssr ? 'ssr' : 'spa'} on localhost:${port}`)
    server.listen(port)
}