const fetch = require('node-fetch')

const restCountriesApiEndpoint = 'https://restcountries.eu/rest/v2/name/'
const countriesCache = {}

const countriesNormalization = {
    'the netherlands': 'netherlands',
    'united stated': 'united states',
    'england': 'united kingdom',
    'u.k.': 'united kingdom',
    'the united kingdom': 'united kingdom',
    'us of a': 'united states',
    'u.s.a.': 'united states',
    'u.s.a': 'united states',
    'south korea': 'korea',
    'new zeland': 'new zealand',
    'newzealand': 'new zealand',
    'england, uk': 'united kingdom',
    'united kindgom': 'united kingdom',
    'unites states': 'united states',
    'mother russia': 'russia',
}

exports.getCountryInfo = async _country => {
    const country = countriesNormalization[_country] || _country
    /*
    const cached = countriesCache[country]
    if (cached !== undefined) {
        return cached
    }
    */

    try {
        const rawResponse = await fetch(`${restCountriesApiEndpoint}${encodeURIComponent(country)}`, {
            method: 'GET',
        })
        const response = await rawResponse.json()
        if ((response.status && response.status === 404) || response.length === 0) {
            // console.warn(`No info available for country: ${country}`)
            countriesCache[country] = null

            return null
        }

        /*
        countriesCache[country] = {
            name: response[0].name,
            region: response[0].region,
            subregion: response[0].subregion,
        }
        */

        return {
            name: response[0].name,
            region: response[0].region,
            subregion: response[0].subregion,
        }
    } catch (error) {
        // console.error(`An error occurred while fetching info for country: ${country}`, error)
        return null
    }
}