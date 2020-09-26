/// <reference path="./config.js" />

const express = require('express')
const { ssr: ssrServer } = require('@roxi/ssr')
const defaults = require('./config')
const { resolve } = require('path')

/** @param {Partial<defaults.Config>} options  */
module.exports.spassr = async function (options) {
    let {
        assetsDir,
        port,
        silent,
        ssr,
        entrypoint,
        script,
        host,
        inlineDynamicImports
    } = { ...defaults, ...options }

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
            res.send(await ssrServer(entrypoint, script, req.url, { host, inlineDynamicImports })))

    if (!silent) console.log(`[spassr] Serving ${ssr ? 'ssr' : 'spa'} on ${host}:${port}`)
    server.listen(port)
}

