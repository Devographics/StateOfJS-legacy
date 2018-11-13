const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const _ = require('lodash')
const YAML = require('yamljs')
const chalk = require('chalk')
const TypeformExtractor = require('./extractors/typeform')
const CompoundAggregator = require('./aggregators/CompoundAggregator')
const elastic = require('./loaders/elastic')
const surveys = require('./conf/surveys')
const sections = require('./conf/sections')
const tools = require('./conf/tools')

const token = 'EjgEahVHbf3ttJhHJuAFJVAnNAbUipmfquAUDCijz6Ly'
const currentSurvey = '2018'
const outputDir = path.join(__dirname, '..', 'surveys', currentSurvey, 'website', 'src', 'data', 'results')

const writeFile = promisify(fs.writeFile)

const fetch = async () => {
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
        const extractor = new TypeformExtractor(survey, { apiToken: token })

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
}

const saveResult = async (file, result) => {
    const yamlFile = path.join(outputDir, `${file}.yml`)
    await writeFile(yamlFile, YAML.stringify(result, 5))
    // console.log(`=> ${yamlFile}`)

    return

    const jsonFile = path.join(outputDir, `${file}.json`)
    await writeFile(jsonFile, JSON.stringify(result, null, '    '))
    // console.log(`=> ${jsonFile}`)
}

const aggregate = async () => {
    const surveyIds = surveys.map(survey => survey.id)
    const surveyConfigs = surveyIds.reduce((acc, surveyId) => ({
        ...acc,
        [surveyId]: YAML.load(`./conf/${surveyId}.yml`),
    }), {})

    const toolIds = surveyConfigs[currentSurvey].tools
    const sectionIds = Object.keys(surveyConfigs[currentSurvey].sections)

    const aggregator = new CompoundAggregator(surveyConfigs)
    const currentSurveyConfig = surveyConfigs[currentSurvey]

    console.log('\ncomputing tools')
    const toolsAggs = await aggregator.computeTools(toolIds, currentSurvey)
    Object.keys(toolsAggs).forEach(async toolId => {
        const agg = toolsAggs[toolId]
        delete agg.would_use
        await saveResult(path.join('tools', toolId), toolsAggs[toolId])
    })

    console.log('\ncomputing tools ranking by section')
    const toolsRanking = Object.keys(currentSurveyConfig.sections).reduce((acc0, sectionId) => {
        const { tools: sectionTools } = currentSurveyConfig.sections[sectionId]
        const rankedSectionTools = sectionTools.map(toolId => {
            return {
                tool: toolId,
                count: toolsAggs[toolId].experience.by_survey.find(s => s.survey === currentSurveyConfig.id).would_use
            }
        }).sort((a, b) => b.count - a.count)

        return {
            ...acc0,
            ...rankedSectionTools.reduce((acc1, tool, i) => ({
                ...acc1,
                [tool.tool]: i + 1,
            }), {})
        }
    }, {})
    await saveResult('tools_ranking', toolsRanking)

    console.log('\ncomputing sections')
    const sectionAggs = await aggregator.computeSections(sectionIds, currentSurvey)

    sectionIds.forEach(async sectionId => {
        const section = sectionAggs.find(s => s.section_id === sectionId)
        section.opinions = []

        const surveySection = currentSurveyConfig.sections[sectionId]
        if (surveySection !== undefined) {
            section.tools = surveySection.tools
            Object.values(surveyConfigs).forEach(surveyConfig => {
                const surveySectionOpinions = {
                    survey_id: surveyConfig.id,
                    tools: []
                }
                surveySection.tools.forEach(toolId => {
                    const toolAggs = toolsAggs[toolId]
                    const toolSurveyOpinions = toolAggs.experience.by_survey.find(s => s.survey === surveyConfig.id)
                    if (toolSurveyOpinions !== undefined) {
                        surveySectionOpinions.tools.push({
                            tool_id: toolId,
                            ..._.omit(toolSurveyOpinions, ['survey']),
                        })
                    }
                })
                section.opinions.push(surveySectionOpinions)
            })
        }

        await saveResult(path.join('sections', sectionId), {
            section_id: section.section_id,
            tools: section.tools,
            opinions: section.opinions,
            other_tools: section.otherTools,
        })
    })

    console.log('\ncomputing user info')
    const userInfo = await aggregator.computeUserInfo()
    //await saveResult('user_info', userInfo)

    console.log('\ncomputing demographics')
    const demographics = await aggregator.computeDemographic()
    await saveResult('demographics/demographics', demographics)

    console.log('\ncomputing global opinions')
    const globalOpinions = await aggregator.computeGlobalOpinions()
    await saveResult('global_opinions/global_opinions', globalOpinions)

    console.log('\ncomputing connections')
    const connections = await aggregator.computeConnections(currentSurvey)
    await saveResult('connections/connections', connections)

    console.log('\ncomputing other tools')
    const otherTools = await aggregator.computeOtherTools(currentSurvey)
    await saveResult('other_tools/other_tools', otherTools)
}

aggregate()