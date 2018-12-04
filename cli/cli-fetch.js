'use strict'
const path = require('path')
const chalk = require('chalk')
const YAML = require('yamljs')
const config = require('@ekino/config')
const { writeFile, unlink, appendFile } = require('./lib/fs')
const elastic = require('./lib/data-pipeline/loaders/elastic')
const TypeformExtractor = require('./lib/data-pipeline/extractors/typeform')
const surveys = require('./conf/surveys')

const run = async () => {
    try {
        console.log(chalk.yellow('initializing elastic indices'))
        await elastic.recreateIndex(config.get('elastic.indices.raw'))
        await elastic.recreateIndex(config.get('elastic.indices.norm'))

        for (let survey of surveys) {
            console.log(`\nfetching results for survey: ${survey.id}`)
            const extractor = new TypeformExtractor(survey, {
                apiToken: config.get('typeform.token')
            })

            const rawFile = path.join(config.get('dataOutputDir'), `${survey.id}.json`)
            try {
                await unlink(rawFile)
            } catch (err) {}

            await extractor.enhanceConfig()
            await writeFile(`./conf/${survey.id}.yml`, YAML.stringify(extractor.config, 10))

            const total = await extractor.fetchResponseCount()
            console.log(`${total} responses to fetch`)

            let count = 0
            await extractor.fetchResults(async items => {
                count += items.length
                console.log(`> ${count}/${total}`)

                await elastic.bulk(
                    config.get('elastic.indices.raw'),
                    'response',
                    items.map(item => item.raw)
                )
                await elastic.bulk(
                    config.get('elastic.indices.norm'),
                    'response',
                    items.map(item => item.normalized)
                )
                await appendFile(
                    rawFile,
                    `${items.map(item => JSON.stringify(item.raw)).join('\n')}\n`
                )
            })
        }
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
