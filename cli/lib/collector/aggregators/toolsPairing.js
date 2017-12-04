'use strict'

const config = require('@ekino/config')
const elastic = require('../elastic')

module.exports = async (
    leftKeys,
    righKeys,
    commonResponse = "I've USED it before, and WOULD use it again"
) => {
    const rightAggs = righKeys.reduce((aggs, field) => {
        aggs[field] = {
            filter: { term: { [field]: commonResponse } },
        }

        return aggs
    }, {})

    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: leftKeys.reduce((aggs, field) => {
                aggs[field] = {
                    filter: { term: { [field]: commonResponse } },
                    aggs: rightAggs,
                }

                return aggs
            }, {}),
        },
    })

    return result.aggregations
}
