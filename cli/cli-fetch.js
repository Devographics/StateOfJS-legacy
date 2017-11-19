'use strict'

const chalk = require('chalk')
const mapValues = require('lodash/mapValues')
const omit = require('lodash/omit')
const typeForm = require('./lib/collector/type_form')
const dto = require('./lib/collector/dto')
const elastic = require('./lib/collector/elastic')
const mapping = require('./lib/collector/mapping')

const run = async () => {
    try {
        console.log(chalk.yellow('Initializing elastic index'))
        try {
            await elastic.deleteIndex()
        } catch (err) {}
        await elastic.createIndex()
        await elastic.putMapping('response', {
            properties: mapValues(mapping.response.properties, value => {
                return omit(value, ['transform'])
            }),
        })

        const result = await typeForm.responses({ limit: 1 })
        const questionById = dto.questionById(result.questions)

        await typeForm.fetchAll({
            onData: async ({ responses }) => {
                await elastic.bulk(
                    'response',
                    responses.map(response => dto.response(questionById, response))
                )
            },
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
