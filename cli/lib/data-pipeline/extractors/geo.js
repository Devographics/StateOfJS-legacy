const fetch = require('node-fetch')

const restCountriesApiEndpoint = 'https://restcountries.eu/rest/v2/name/'

/**
 * Used to normalize country name before calling the API
 */
const countriesPreNormalization = {
    'the netherlands': 'netherlands',
    'united stated': 'united states',
    england: 'united kingdom',
    'u.k.': 'united kingdom',
    'the united kingdom': 'united kingdom',
    'us of a': 'united states',
    'u.s.a.': 'united states',
    'u.s.a': 'united states',
    'south korea': 'korea',
    'new zeland': 'new zealand',
    newzealand: 'new zealand',
    'england, uk': 'united kingdom',
    'united kindgom': 'united kingdom',
    'unites states': 'united states',
    'mother russia': 'russia'
}

/**
 * Used to normalize country name after API retrieval
 */
const countriesPostNormalization = {
    'Russian Federation': 'Russia',
    'United States of America': 'USA',
    'United States Minor Outlying Islands': 'USA',
    'Macedonia (the former Yugoslav Republic of)': 'Macedonia',
    'Bolivia (Plurinational State of)': 'Bolivia',
    'Venezuela (Bolivarian Republic of)': 'Venezuela',
    'Moldova (Republic of)': 'Moldova',
    'British Indian Ocean Territory': 'India',
    "Korea (Democratic People's Republic of)": 'Korea',
    'Viet Nam': 'Vietnam',
    'Iran (Islamic Republic of)': 'Iran',
    'Tanzania, United Republic of': 'Tanzania',
    'United Kingdom of Great Britain and Northern Ireland': 'England'
}

let countriesCache = {}

exports.getContinent = (region, subregion) => {
    if (region !== 'Americas') return region
    if (subregion === 'South America') return subregion
    return 'North America'
}

exports.getCountryInfo = async _country => {
    const country = countriesPreNormalization[_country] || _country
    const cached = countriesCache[country]
    if (cached !== undefined) {
        return cached
    }

    try {
        const rawResponse = await fetch(
            `${restCountriesApiEndpoint}${encodeURIComponent(country)}`,
            {
                method: 'GET'
            }
        )
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
            country: countriesPostNormalization[response[0].name] || response[0].name,
            continent: exports.getContinent(response[0].region, response[0].subregion)
        }

        return countriesCache[country]
    } catch (error) {
        // console.error(`An error occurred while fetching info for country: ${country}`, error)
        return null
    }
}
