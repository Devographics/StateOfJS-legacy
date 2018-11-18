const experience = require('../../../conf/experience')
const awardsAggregator = require('./awards')
const sectionsAggregator = require('./sections')
const toolsAggregator = require('./tools')
const demographicAggregator = require('./demographic')
const globalOpinionsAggregator = require('./global_opinions')
const connectionsAggregator = require('./connections')
const otherToolsAggregator = require('./other_tools')

class CompoundAggregator {
    constructor(config) {
        this.config = config
    }

    async computeSections(sectionIds, currentSurveyId) {
        const surveyIds = Object.keys(this.config)
        const currentSurveyConfig = this.config[currentSurveyId]

        const happiness = await sectionsAggregator.happiness(sectionIds, surveyIds, this.config)
        const otherTools = await sectionsAggregator.otherToolsForSurvey(currentSurveyConfig)
        const toolsUserInfoDistribution = await sectionsAggregator.toolsOpinionUserInfoDistribution(
            currentSurveyConfig,
            experience.WOULD_USE
        )
        // const numberOfToolsUsed = await sectionsAggregator.toolsBySimilarOpinionForSurvey(currentSurveyConfig.sections, experience.WOULD_USE, currentSurveyId)

        return sectionIds.map(sectionId => ({
            section_id: sectionId,
            happiness: happiness[sectionId],
            otherTools: otherTools[sectionId],
            usageUsersInfo: toolsUserInfoDistribution[sectionId]
        }))
    }

    async computeTools(tools, currentSurveyId) {
        const surveyIds = Object.keys(this.config)

        const toolsPairing = await toolsAggregator.toolsPairingByOpinionForSurvey(
            this.config[currentSurveyId].tools,
            experience.WOULD_USE,
            this.config[currentSurveyId].sections,
            currentSurveyId
        )
        const toolsExperiencesAggs = await toolsAggregator.experiences(
            tools,
            surveyIds,
            this.config
        )
        const toolsExperienceAggs = await toolsAggregator.experience(
            tools,
            surveyIds,
            this.config,
            experience.WOULD_USE
        )
        const toolsReasonsAggs = await toolsAggregator.reasons(tools)
        const toolsWouldUseByCountryAggs = await toolsAggregator.opinionByCountry(
            tools,
            experience.WOULD_USE
        )
        Object.keys(toolsExperienceAggs).forEach(tool => {
            toolsExperiencesAggs[tool][experience.WOULD_USE] = toolsExperienceAggs[tool]
            toolsExperiencesAggs[tool].reasons = toolsReasonsAggs[tool]
            toolsExperiencesAggs[tool][
                `${experience.WOULD_USE}_by_country`
            ] = toolsWouldUseByCountryAggs[tool].find(d => d.survey === currentSurveyId)
            toolsExperiencesAggs[tool].pairing = toolsPairing[tool]
        })

        return toolsExperiencesAggs
    }

    async computeDemographic(currentSurveyId) {
        return {
            salary: await demographicAggregator.salary(),
            years_of_experience: await demographicAggregator.yearsOfExperience(),
            company_size: await demographicAggregator.companySize(),
            by_country: await demographicAggregator.salaryAndCompanySizeAndYearsOfExperienceByLocationForSurvey(
                'country',
                currentSurveyId
            ),
            participation: await demographicAggregator.participationByCountry(),
            gender: await demographicAggregator.genderBreakdown()
        }
    }

    async computeGlobalOpinions() {
        return globalOpinionsAggregator.globalOpinions()
    }

    async computeConnections(currentSurveyId) {
        return connectionsAggregator.computeToolsMatrixForSurveyAndOpinion(
            this.config[currentSurveyId].sections,
            currentSurveyId,
            experience.WOULD_USE
        )
    }

    async computeOtherTools(currentSurveyId) {
        return otherToolsAggregator.otherToolsForSurvey(this.config[currentSurveyId])
    }

    async computeAwards(currentSurveyId) {
        const currentSurvey = this.config[currentSurveyId]

        return [
            {
                type: 'highest_satisfaction',
                tools: await awardsAggregator.hightestSatisfaction(currentSurvey, ['es6'])
            },
            {
                type: 'highest_interest',
                tools: await awardsAggregator.highestInterest(currentSurvey, ['es6'])
            },
            {
                type: 'highest_usage',
                tools: await awardsAggregator.highestUsage(currentSurvey, ['es6'])
            },
            {
                type: 'most_mentioned',
                tools: await awardsAggregator.mostMentioned(currentSurvey, ['es6'])
            }
        ]
    }
}

module.exports = CompoundAggregator
