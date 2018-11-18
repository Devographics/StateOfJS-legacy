'use strict'
const path = require('path')
const _ = require('lodash')
const YAML = require('yamljs')
const config = require('@ekino/config')
const { writeFile } = require('./lib/fs')
const CompoundAggregator = require('./lib/data-pipeline/aggregators/CompoundAggregator')
const surveys = require('./conf/surveys')

const currentSurvey = '2018'
const outputDir = config.get('dataOutputDir')

const saveResult = async (file, result) => {
    const yamlFile = path.join(outputDir, `${file}.yml`)
    await writeFile(yamlFile, YAML.stringify(result, 10))
}

const run = async () => {
    const surveyIds = surveys.map(survey => survey.id)
    const surveyConfigs = surveyIds.reduce(
        (acc, surveyId) => ({
            ...acc,
            [surveyId]: YAML.load(`./conf/${surveyId}.yml`)
        }),
        {}
    )

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
        const rankedSectionTools = sectionTools
            .map(toolId => {
                return {
                    tool: toolId,
                    count: toolsAggs[toolId].experience.by_survey.find(
                        s => s.survey === currentSurveyConfig.id
                    ).counts.would_use
                }
            })
            .sort((a, b) => {
                return b.count - a.count
            })

        return {
            ...acc0,
            ...rankedSectionTools.reduce(
                (acc1, tool, i) => ({
                    ...acc1,
                    [tool.tool]: i + 1
                }),
                {}
            )
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
                    const toolSurveyOpinions = toolAggs.experience.by_survey.find(
                        s => s.survey === surveyConfig.id
                    )
                    if (toolSurveyOpinions !== undefined) {
                        surveySectionOpinions.tools.push({
                            tool_id: toolId,
                            ..._.omit(toolSurveyOpinions, ['survey'])
                        })
                    }
                })
                section.opinions.push(surveySectionOpinions)
            })
        }

        await saveResult(path.join('sections', sectionId), {
            section_id: section.section_id,
            tools: section.tools,
            happiness: section.happiness,
            opinions: section.opinions,
            other_tools: section.otherTools,
            usage_users_info: section.usageUsersInfo
        })
    })

    console.log('\ncomputing demographics')
    const demographics = await aggregator.computeDemographic(currentSurvey)
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

run()
