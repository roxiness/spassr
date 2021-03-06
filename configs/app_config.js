const map = {
    assets: 'assetsDir',
    template: 'entrypoint'
}

module.exports = {
    name: 'appConfig',
    condition: ({ pkgjson }) => pkgjson.appConfig,
    supersedes: ['default', 'svite'],
    config: ({ pkgjson }) => Object.entries(pkgjson.appConfig)
        .reduce((acc, [key, val]) => ({
            ...acc,
            [map[key] || key]: val
        }), {})
}
