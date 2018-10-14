const fetch = require('node-fetch')

const restCountriesApiEndpoint = 'https://restcountries.eu/rest/v2/name/'

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

let countriesCache = {}

exports.getContinent = (region, subregion) => {
    if (region !== 'Americas') return region
    if (subregion === 'South America') return subregion
    return 'North America'
}

exports.getCountryInfo = async _country => {
    const country = countriesNormalization[_country] || _country
    const cached = countriesCache[country]
    if (cached !== undefined) {
        return cached
    }

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

        if (Object.keys(countriesCache).length > 3000) {
            countriesCache = {}
        }

        countriesCache[country] = {
            country: response[0].name,
            continent: exports.getContinent(response[0].region, response[0].subregion),
        }

        return countriesCache[country]
    } catch (error) {
        // console.error(`An error occurred while fetching info for country: ${country}`, error)
        return null
    }
}