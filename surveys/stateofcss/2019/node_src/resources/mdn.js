const fetch = require('node-fetch')

exports.normalizeMdnResource = res => {
    return [res, ...res.translations].map(translation => {
        return {
            locale: translation.locale,
            url: translation.url,
            title: translation.title,
            summary: translation.summary
        }
    })
}

exports.fetchMdnResource = async path => {
    try {
        const res = await fetch(`https://developer.mozilla.org${path}$json`)
        const json = await res.json()

        return exports.normalizeMdnResource(json)
    } catch (error) {
        console.error(`an error occurred while fetching mdn resource`, error)
        throw error
    }
}
