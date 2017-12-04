'use strict'

const { sortBy } = require('lodash')
const config = require('@ekino/config')
const elastic = require('../elastic')

/**
 * Compute aggregations according to number of tools used.
 *
 * @param {Array.<string>} tools
 *
 * @return {Promise.<Array.<Object>>}
 */
module.exports = async tools => {
    const totalScript = `
        def fields = ['${tools.join("', '")}'];
        
        def total = 0; for (int i = 0; i < fields.length; i++) {
            if(doc[fields[i]][0] == "I've USED it before, and WOULD use it again") {
                total += 1;
            }
        }
        
        return total;
    `.trim()

    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: {
                by_count: {
                    terms: {
                        script: {
                            lang: 'painless',
                            source: totalScript,
                        },
                    },
                },
            },
        },
    })

    return sortBy(
        result.aggregations.by_count.buckets.map(bucket => ({
            ...bucket,
            key: Number(bucket.key),
        })),
        'key'
    )
}
