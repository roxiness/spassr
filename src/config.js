const tossr = require('tossr')

/**
 * @typedef {object} Config
 * @prop {string|string[]} assetsDir                      - folders with static content to be served.
 * @prop {string} entrypoint                              - HTML template, eg. assets/index.html.
 * @prop {string} script                                  - path to app, eg. build/bundle.js.
 * @prop {string|number} port                             - port to serve on.
 * @prop {boolean} ssr                                    - enable SSR for routes not resolved in assetsDir.
 * @prop {boolean} silent                                 - quiet console.log.
 * @prop {Partial<tossr.Config>} ssrOptions                  - options to pass to ssr
 */

  /**
 * Called before/after the app script is evaluated
 * @callback Eval
 * @param {object} dom The DOM object
 * */

/** @type {Config} */
const config = {
    assetsDir: 'dist',
    entrypoint: 'dist/__app.html',
    script: 'dist/build/bundle.js',
    port: "5000",
    ssr: false,
    silent: false,
    ssrOptions: {}
}

module.exports = config