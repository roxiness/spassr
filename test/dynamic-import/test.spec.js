const test = require('ava').default
const { removeSync } = require('fs-extra')
const { spassr } = require('../..')
const { resolve } = require('path')
const fetch = require('node-fetch').default

test.before(async t => {
    removeSync(resolve(__dirname, 'dist/__roxi-ssr-bundle.js'))
    await spassr({
        assetsDir: [],
        entrypoint: resolve(__dirname, 'dist/index.html'),
        script: resolve(__dirname, 'dist/main.js'),
        port: 5000,
        ssr: true,
        ssrOptions: {
            inlineDynamicImports: true,
            timeout: 1000,
        }
    })
})

test('dynamic imports', async t => {
    const res = await fetch('http://127.0.0.1:5000').then(res => res.text())    
    const expected =`<html><head><meta data-render="ssr"></head><body>\n    <div id="app"><div id="status">imported</div></div>\n  \n\n</body></html>`
    t.is(res, expected)

})

test('timeouts', async t => {
    const res2 = await fetch('http://127.0.0.1:5000/timeout').then(res => res.text())    
    const expected2 =`<html><head><meta data-render="ssr"></head><body>\n    <div id="app"><div id="status">imported</div></div>\n  \n\n</body></html>`
    t.is(res2, expected2)
})
