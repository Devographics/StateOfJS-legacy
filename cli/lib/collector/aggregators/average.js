'use strict'

const config = require('@ekino/config')
const elastic = require('../elastic')

module.exports = async field => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: {
                avg: { avg: { field } },
            },
        },
    })

    return result.aggregations.avg.value
}
