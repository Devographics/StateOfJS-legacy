'use strict'

const mapKeys = require('lodash/mapKeys')
const mapValues = require('lodash/mapValues')
const mapping = require('./mapping')

const responseMapping = mapping.response.properties

exports.questionById = questions =>
    questions.reduce((acc, question) => {
        acc[question.id] = question.question
        return acc
    }, {})

exports.response = (questionById, response) => {
    return mapValues(
        Object.assign(
            { token: response.token },
            response.metadata,
            response.hidden,
            mapKeys(response.answers, (_, key) => questionById[key])
        ),
        (value, key) => {
            if (responseMapping[key] && responseMapping[key].transform)
                return responseMapping[key].transform(value)
            return value
        }
    )
}

exports.aggregations = aggs =>
    mapValues(aggs, agg =>
        agg.buckets.reduce((acc, bucket) => {
            acc[bucket.key] = bucket.doc_count
            return acc
        }, {})
    )
