'use strict'
const chalk = require('chalk')
const YAML = require('yamljs')
const config = require('@ekino/config')
const { writeFile } = require('./lib/fs')
const elastic = require('./lib/data-pipeline/loaders/elastic')
const TypeformExtractor = require('./lib/data-pipeline/extractors/typeform')
const surveys = require('./conf/surveys')

const run = async () => {
    try {
        console.log(chalk.yellow('initializing elastic index'))
        try {
            await elastic.deleteIndex()
        } catch (err) {
            // error occurs if the index doesn't exist,
            // which is the case on init
        }
        await elastic.createIndex()
    
        for (let survey of surveys) {
            console.log(`\nfetching results for survey: ${survey.id}`)
            const extractor = new TypeformExtractor(survey, { apiToken: config.get('typeform.token') })
    
            await extractor.enhanceConfig()
            await writeFile(`./conf/${survey.id}.yml`, YAML.stringify(extractor.config, 10))
    
            const total = await extractor.fetchResponseCount()
            console.log(`${total} responses to fetch`)
    
            let count = 0
            await extractor.fetchResults(async items => {
                count += items.length
                console.log(`> ${count}/${total}`)
    
                await elastic.bulk('response', items)
            })
        }
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
