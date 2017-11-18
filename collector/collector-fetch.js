'use strict'

const typeForm = require('./lib/type_form')
const dto = require('./lib/dto')
const chalk = require('chalk')
const mapValues = require('lodash/mapValues')
const omit = require('lodash/omit')
const elastic = require('./lib/elastic')
const mapping = require('./lib/mapping')

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
