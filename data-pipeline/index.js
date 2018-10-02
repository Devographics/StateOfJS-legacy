const fs = require('fs')
const { promisify } = require('util')
const YAML = require('yamljs')
const chalk = require('chalk')
const TypeformExtractor = require('./extractors/typeform')
const CompoundAggregator = require('./aggregators/CompoundAggregator')
const elastic = require('./loaders/elastic')
const surveys = require('./conf/surveys')
const sections = require('./conf/sections')
const tools = require('./conf/tools')

const writeFile = promisify(fs.writeFile)

const token = 'EjgEahVHbf3ttJhHJuAFJVAnNAbUipmfquAUDCijz6Ly'

const fetch = async () => {
    console.log(chalk.yellow('initializing elastic index'))
    try {
        await elastic.deleteIndex()
    } catch (err) {}
    await elastic.createIndex()

    for (let survey of surveys) {
        console.log(`\nfetching results for survey: ${survey.id}`)
        const extractor = new TypeformExtractor(survey, { apiToken: token })

        await extractor.enhanceConfig()
        await writeFile(`./conf/${survey.id}.yml`, YAML.stringify(extractor.config, 10))

        const total = await extractor.fetchResponseCount()
        console.log(`${total} responses to fetch`)

        let count = 0
        await extractor.fetchResults(async (items) => {
            count += items.length
            console.log(`> ${count} of ${total}`)

            await elastic.bulk('response', items)
        })
    }
}

const saveResult = async (file, result) => {
    await writeFile(`./results/${file}.yml`, YAML.stringify(result, 5))
    await writeFile(`./results/${file}.json`, JSON.stringify(result, null, '    '))
}

const aggregate = async () => {
    const surveyIds = surveys.map(survey => survey.id)
    const toolIds = tools.map(tool => tool.id)
    const sectionIds = Object.values(sections)

    const surveyConfigs = surveyIds.reduce((acc, surveyId) => ({
        ...acc,
        [surveyId]: YAML.load(`./conf/${surveyId}.yml`),
    }), {})
    const aggregator = new CompoundAggregator(surveyConfigs)

    const participation = await aggregator.computeParticipation()
    await saveResult('participation', participation)

    const sectionAggs = await aggregator.computeSections(sectionIds)
    await saveResult('sections', sectionAggs)

    const userInfo = await aggregator.computeUserInfo()
    await saveResult('user_info', userInfo)

    const toolsAggs = await aggregator.computeTools(toolIds)
    await saveResult(`tools`, toolsAggs)
}

fetch()