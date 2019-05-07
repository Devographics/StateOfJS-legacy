const fetch = require('node-fetch')

exports.normalizeCaniuseResource = res => {
    const stats = Object.entries(res.stats).map(([browser, byVersion]) => ({
        browser,
        by_version: Object.entries(byVersion).map(([version, support]) => ({
            version,
            support
        }))
    }))

    return { ...res, stats }
}

exports.fetchCaniuseResource = async id => {
    try {
        const res = await fetch(
            `https://raw.githubusercontent.com/Fyrd/caniuse/master/features-json/${id}.json`
        )
        const json = await res.json()

        return exports.normalizeCaniuseResource(json)
    } catch (error) {
        console.error(`an error occurred while fetching caniuse resource`, error)
        throw error
    }
}
