/**
 * @typedef {string} Path
 * @typedef {string} Script
 * 
 * @typedef {object} Config
 * @prop {string} host                  - spoof host, eg. http://localhost.
 * @prop {string|string[]} assetsDir    - folders with static content to be served.
 * @prop {string} entrypoint            - HTML template, eg. assets/index.html.
 * @prop {string} script                - path to app, eg. build/bundle.js.
 * @prop {string|number} port           - port to serve on.
 * @prop {boolean} ssr                  - enable SSR for routes not resolved in assetsDir.
 * @prop {boolean} silent               - quiet console.log.
 * @prop {boolean} inlineDynamicImports - required for apps with dynamic imports.
 * @prop {number} timeout               - max time for a page to render.
 */


/** @type {Config} */
const config = {
    host: 'http://localhost',
    assetsDir: 'dist',
    entrypoint: 'dist/__app.html',
    script: 'dist/build/bundle.js',
    port: "5000",
    ssr: false,
    silent: false,
    inlineDynamicImports: false,
    timeout: 5000
}

module.exports = config