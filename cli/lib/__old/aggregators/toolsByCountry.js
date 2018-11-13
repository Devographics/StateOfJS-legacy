'use strict'

const { pick, values } = require('lodash')
const config = require('@ekino/config')
const elastic = require('../elastic')
const helpers = require('./helpers')

/**
 * Retrieve usage (I've USED it before, and WOULD use it again),
 * and compute stats per country.
 *
 * @param {Array.<string>} fields - The fields you wish to retrieve
 *
 * @return {Promise.<Array.<Object>>} Corresponding buckets
 */
module.exports = async fields => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: {
                ...fields.reduce((aggs, field) => {
                    aggs[field] = {
                        filter: {
                            term: { [field]: "I've USED it before, and WOULD use it again" }
                        }
                    }

                    return aggs
                }, {}),
                country: {
                    terms: { field: 'location', size: 32 },
                    aggs: fields.reduce((aggs, field) => {
                        aggs[field] = {
                            filter: {
                                term: { [field]: "I've USED it before, and WOULD use it again" }
                            }
                        }

                        return aggs
                    }, {})
                }
            }
        }
    })

    // compute global percentages to be able to compute divergence afterward
    const total = fields.reduce((t, field) => t + result.aggregations[field].doc_count, 0)
    fields.forEach(field => {
        result.aggregations[field].percentage = Math.round(
            (result.aggregations[field].doc_count / total) * 100
        )
    })
    helpers.fixBucketsPercentages(values(pick(result.aggregations, fields)))

    // compute percentage for each country + divergence from overall stats
    result.aggregations.country.buckets.forEach(country => {
        const total = fields.reduce((t, field) => t + country[field].doc_count, 0)

        fields.forEach(field => {
            country[field].percentage = Math.round((country[field].doc_count / total) * 100)
        })
        helpers.fixBucketsPercentages(values(pick(country, fields)))

        fields.forEach(field => {
            country[field].divergence =
                country[field].percentage - result.aggregations[field].percentage
        })
    })

    return result.aggregations.country.buckets
}
