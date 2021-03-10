module.exports = {
    name: 'Svite',
    condition: ({ pkgjson }) => pkgjson.dependencies['@svitejs/vite-plugin-svelte'],
    supersedes: ['default'],
    config: () => {
        const { readFileSync } = require('fs')
        const html = readFileSync('./dist/index.html', 'utf8')
        const script = 'dist' + html.match(/<script .+?src="([^"]+)"/)[1]

        return {
            assetsDir: 'dist',
            entrypoint: 'dist/index.html',
            ssrOptions: { inlineDynamicImports: true },            
            script
        }
    }
}