module.exports = {
    name: 'Svite',
    condition: ({ pkgjson }) => pkgjson.dependencies['@svitejs/vite-plugin-svelte'],
    supersedes: ['default'],
    config: () => {
        const config = {
            assetsDir: 'dist',
            entrypoint: 'dist/index.html',
            ssrOptions: { inlineDynamicImports: true }
        }

        const script = getScript(config.entrypoint)
        if (script)
            config.script = `dist${script}`

        return config
    }
}

function getScript(entrypoint) {
    const { readFileSync, existsSync } = require('fs')
    if (existsSync(entrypoint))
        return readFileSync(entrypoint, 'utf8')
            .match(/<script .+?src="([^"]+)"/)[1]
}