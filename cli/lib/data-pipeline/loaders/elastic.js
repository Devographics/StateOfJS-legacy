'use strict'

const { Client } = require('elasticsearch')
const config = require('@ekino/config')

const client = new Client({
    host: `${config.get('elastic.host')}:${config.get('elastic.port')}`,
    log: config.get('elastic.log')
})

const index = config.get('elastic.index')

exports.client = client

exports.createIndex = async index => client.indices.create({ index })

exports.deleteIndex = async index => client.indices.delete({ index })

exports.bulk = async (index, type, items) => {
    return client.bulk({
        body: items.reduce((acc, item) => {
            acc.push({
                index: {
                    _index: index,
                    _type: type
                }
            })
            acc.push(item)

            return acc
        }, [])
    })
}

exports.search = async (index, query) => client.search({ index, ...query })

exports.aggs = async (index, aggs) => {
    return client.search({
        index,
        size: 0,
        body: {
            query: { match_all: {} },
            aggs
        }
    })
}

exports.recreateIndex = async index => {
    try {
        await exports.deleteIndex(index)
    } catch (err) {
        // error occurs if the index doesn't exist,
        // which is the case on init
    }
    await exports.createIndex(index)
}
