'use strict'

const { Client } = require('elasticsearch')
const config = require('@ekino/config')

const client = new Client({
    host: `${config.get('elastic.host')}:${config.get('elastic.port')}`,
    log: config.get('elastic.log')
})

const index = config.get('elastic.index')

exports.client = client

exports.createIndex = async () => client.indices.create({ index })

exports.deleteIndex = async () => client.indices.delete({ index })

exports.putMapping = async (type, mapping) =>
    client.indices.putMapping({ index, type, body: mapping })

exports.bulk = async (type, items) =>
    client.bulk({
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

exports.termsAggs = async (fields, size = 20) =>
    client.search({
        index,
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: fields.reduce((aggs, field) => {
                aggs[field] = {
                    terms: { field, size }
                }
                return aggs
            }, {})
        }
    })

exports.termsAgg = async (field, size = 20) => exports.termsAggs([field], size)
