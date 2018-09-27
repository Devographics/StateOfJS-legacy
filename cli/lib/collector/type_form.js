'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('@ekino/config')
const Progress = require('progress')

const { base_url: baseUrl, form_id: formId, api_key: apiKey } = config.get('type_form')

const BATCH_SIZE = 500

const buildApiRequest = params => {
    const options = {
        uri: `${baseUrl}/${formId}`,
        qs: {
            key: apiKey
        },
        json: true,
        headers: {}
    }

    if (params) {
        options.qs = Object.assign(options.qs, params)
    }

    return request(options)
}

exports.responses = async ({ offset = 0, limit = 20, ...rest } = {}) =>
    buildApiRequest(Object.assign({ offset, limit }, rest))

exports.fetchAll = async ({ onData }) => {
    const init = await exports.responses({ limit: 1, completed: 'true' })
    const totalResponses = init.stats.responses.completed
    const iterations = totalResponses / BATCH_SIZE

    console.log(`${chalk.white(totalResponses)} responses to fetch`)

    const progress = new Progress(`:bar :percent remaining: :etas`, {
        total: totalResponses,
        width: 64,
        incomplete: ' ',
        complete: '◼'
    })

    let fetchedCount = 0
    for (let i = 0; i < iterations; i++) {
        const responses = await exports.responses({
            offset: i * BATCH_SIZE,
            limit: BATCH_SIZE,
            completed: 'true'
        })

        await onData(responses)

        fetchedCount += responses.responses.length
        progress.tick(responses.responses.length)
    }

    console.log(`fetched ${chalk.white(fetchedCount)} responses`)
}
