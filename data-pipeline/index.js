const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
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

const outputDir = path.join(__dirname, '..', 'surveys', '2018', 'website', 'src', 'data', 'results')
console.log(outputDir)

const fetch = async () => {
    /*
    console.log(chalk.yellow('initializing elastic index'))
    try {
        await elastic.deleteIndex()
    } catch (err) {}
    await elastic.createIndex()
    */

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
    const yamlFile = path.join(outputDir, `${file}.yml`)
    await writeFile(yamlFile, YAML.stringify(result, 5))
    console.log(`=> ${yamlFile}`)

    return

    const jsonFile = path.join(outputDir, `${file}.json`)
    await writeFile(jsonFile, JSON.stringify(result, null, '    '))
    console.log(`=> ${jsonFile}`)
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

    console.log('\ncomputing participation')
    const participation = await aggregator.computeParticipation()
    //await saveResult('participation', participation)

    console.log('\ncomputing sections')
    const sectionAggs = await aggregator.computeSections(sectionIds)
    //await saveResult('sections', sectionAggs)

    console.log('\ncomputing user info')
    const userInfo = await aggregator.computeUserInfo()
    //await saveResult('user_info', userInfo)

    console.log('\ncomputing tools')
    const toolsAggs = await aggregator.computeTools(toolIds)
    //await saveResult(`tools`, toolsAggs)
    Object.keys(toolsAggs).forEach(async toolId => {
        const agg = toolsAggs[toolId]
        delete agg.would_use
        await saveResult(path.join('tools', toolId), toolsAggs[toolId])
    })
}

aggregate()