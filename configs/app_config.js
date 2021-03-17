const map = {
    template: 'entrypoint'
}

module.exports = {
    name: 'appConfig',
    condition: ({ pkgjson }) => pkgjson.appConfig,
    supersedes: ['default', 'svite'],
    config: ({ pkgjson }) => {
        const cfg = Object.entries(pkgjson.appConfig)
            .reduce((acc, [key, val]) => ({
                ...acc,
                [map[key] || key]: val
            }), {})

        cfg.assetsDir = [cfg.distDir, cfg.assetsDir].filter(Boolean)

        return cfg
    }
}
