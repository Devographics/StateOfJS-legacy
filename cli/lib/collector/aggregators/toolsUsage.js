'use strict'

const { values, mapValues } = require('lodash')
const config = require('@ekino/config')
const elastic = require('../elastic')

module.exports = async (tools, experience = `I've USED it before, and WOULD use it again`) => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: tools.reduce((aggs, tool) => ({
                ...aggs,
                [tool]: {
                    filter: { term: { [tool]: experience } },
                }
            }), {}),
        },
    })

    const total = result.hits.total
    const aggs = values(mapValues(result.aggregations, (bucket, key) => ({
        ...bucket,
        key,
        percentage: Math.round(bucket.doc_count / total * 100)
    })))

    return aggs
}