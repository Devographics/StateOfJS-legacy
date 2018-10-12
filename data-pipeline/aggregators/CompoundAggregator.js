const experience = require('../conf/experience')
const participationAggregator = require('./participation')
const userInfoAggregator = require('./user_info')
const sectionsAggregator = require('./sections')
const toolsAggregator = require('./tools')

class CompoundAggregator {
    constructor(config) {
        this.config = config
    }

    async computeParticipation() {
        const surveyIds = Object.keys(this.config)

        const participation = await participationAggregator.participation(surveyIds)
        const byLocation = await participationAggregator.participationByLocation(surveyIds)

        return {
            participation,
            byLocation,
        }
    }

    async computeUserInfo() {
        const salary = await userInfoAggregator.salary()
        const companySize = await userInfoAggregator.companySize()
        const yearsOfExperience = await userInfoAggregator.yearsOfExperience()

        return {
            salary,
            companySize,
            yearsOfExperience,
        }
    }

    async computeSections(sectionIds) {
        const surveyIds = Object.keys(this.config)

        const happiness = await sectionsAggregator.happiness(sectionIds, surveyIds, this.config)

        return {
            happiness,
        }
    }

    async computeTools(tools) {
        const surveyIds = Object.keys(this.config)

        const toolsExperiencesAggs = await toolsAggregator.experiences(tools, surveyIds, this.config)
        const toolsExperienceAggs = await toolsAggregator.experience(tools, surveyIds, this.config, experience.WOULD_USE)
        const toolsReasonsAggs = await toolsAggregator.reasons(tools)
        Object.keys(toolsExperienceAggs).forEach(tool => {
            toolsExperiencesAggs[tool][experience.WOULD_USE] = toolsExperienceAggs[tool]
            toolsExperiencesAggs[tool].reasons = toolsReasonsAggs[tool]
        })

        return toolsExperiencesAggs
    }
}

module.exports = CompoundAggregator
