const { last } = require('lodash')
const fetch = require('node-fetch')
const tools = require('../conf/tools')
const userInfo = require('../conf/user_info')
const normalize = require('../conf/normalize')
const types = require('./fields')
const util = require('./util')

const TYPEFORM_FIELD_TYPE_MULTI_CHOICE = 'multiple_choice'
const TYPEFORM_FIELD_TYPE_RATING = 'rating'

const BATCH_SIZE = 1000

const otherToolsExtractor = util.extractToolsFromText(normalize)

class TypeformExtractor {
    constructor(config, {
        endpoint = 'https://api.typeform.com',
        apiToken,
    }) {
        this.endpoint = endpoint
        this.apiToken = apiToken
        this.config = config
    }

    async fetchForm() {
        const rawResponse = await fetch(`${this.endpoint}/forms/${this.config.typeform.id}`, {
            method: 'GET',
            headers: { authorization: `bearer ${this.apiToken}` },
        })
        return rawResponse.json()
    }

    async enhanceConfig() {
        const form = await this.fetchForm()

        const experienceLabels = Object.keys(this.config.experience)
        const isExperienceField = field => {
            return field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE && field.properties.choices.every(choice => {
                return experienceLabels.includes(choice.label)
            })
        }

        const isLikeReasonsField = field => {
            return field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE && field.ref.endsWith('_love')
        }

        const isDislikeReasonsField = field => {
            return field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE && field.ref.endsWith('_hate')
        }

        this.config.tools = []
        this.config.userInfo = []

        const fieldsConfig = {}
        Object.keys(this.config.sections).forEach(sectionId => {
            const sectionConfig = this.config.sections[sectionId]
            const sectionField = form.fields.find(field => field.title === sectionConfig.title)
            if (sectionField === undefined) {
                throw new Error(`no field found for section ${sectionId} (${sectionConfig.title})`)
            }

            const sectionTools = []
            sectionField.properties.fields.forEach(field => {
                if (isExperienceField(field)) {
                    const tool = tools.find(t => t.aliases.includes(field.title))
                    if (tool === undefined) {
                        throw new Error(`no tool found for field ${field.title} (${JSON.stringify(field)})`)
                    }

                    fieldsConfig[field.id] = { type: types.FIELD_TYPE_TOOL, tool: tool.id }
                    sectionTools.push(tool.id)
                    this.config.tools.push(tool.id)
                    return
                }

                if (field.type === TYPEFORM_FIELD_TYPE_RATING) {
                    fieldsConfig[field.id] = { type: types.FIELD_TYPE_HAPPINESS, section: sectionId }
                    return
                }

                if (field.title === sectionConfig.freeform) {
                    fieldsConfig[field.id] = { type: types.FIELD_TYPE_OTHER_TOOLS, section: sectionId }
                    return
                }

                if (isLikeReasonsField(field)) {
                    fieldsConfig[field.id] = {
                        type: types.FIELD_TYPE_TOOL_LIKE_REASONS,
                        tool: field.ref.slice(0, -5),
                    }
                    return
                }

                if (isDislikeReasonsField(field)) {
                    fieldsConfig[field.id] = {
                        type: types.FIELD_TYPE_TOOL_DISLIKE_REASONS,
                        tool: field.ref.slice(0, -5),
                    }
                    return
                }

                console.log('OTHER FIELD')
                console.log(field)
            })
            sectionConfig.tools = sectionTools

            delete sectionConfig.typeform
        })
        this.config.typeform.fields = fieldsConfig

        const aboutField = form.fields.find(field => field.title === 'About You')
        if (aboutField === undefined) {
            throw new Error('Unable to find "About You" field')
        }

        const yearsOfExperienceField = aboutField.properties.fields.find(field => field.title === 'Years of Experience')
        if (yearsOfExperienceField === undefined) {
            throw new Error('Unable to find years of experience field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_YEARS_OF_EXPERIENCE)
        this.config.typeform.fields[yearsOfExperienceField.id] = {
            type: types.FIELD_TYPE_YEARS_OF_EXPERIENCE,
        }

        const companySizeField = aboutField.properties.fields.find(field => field.title === 'Company Size')
        if (companySizeField === undefined) {
            throw new Error('Unable to find company size field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_COMPANY_SIZE)
        this.config.typeform.fields[companySizeField.id] = {
            type: types.FIELD_TYPE_COMPANY_SIZE,
        }

        const salaryField = aboutField.properties.fields.find(field => field.title === 'Yearly Salary')
        if (salaryField === undefined) {
            throw new Error('Unable to find salary field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_SALARY)
        this.config.typeform.fields[salaryField.id] = {
            type: types.FIELD_TYPE_SALARY,
        }

        const emailField = aboutField.properties.fields.find(field => field.title === 'Your Email')
        if (emailField === undefined) {
            throw new Error('Unable to find email field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_EMAIL)
        this.config.typeform.fields[emailField.id] = {
            type: types.FIELD_TYPE_EMAIL,
        }

        const sourceField = aboutField.properties.fields.find(field => field.title === 'How did you find out about this survey?')
        if (sourceField !== undefined) {
            this.config.userInfo.push(types.FIELD_TYPE_SOURCE)
            this.config.typeform.fields[sourceField.id] = {
                type: types.FIELD_TYPE_SOURCE,
            }
        }

        aboutField.properties.fields.forEach(field => {
            console.log(field.title)
        })
    }

    async fetchResponseCount() {
        const rawResponse = await fetch(`${this.endpoint}/forms/${this.config.typeform.id}/responses?completed=true&page_size=1`, {
            method: 'GET',
            headers: { authorization: `bearer ${this.apiToken}` },
        })
        const response = await rawResponse.json()

        return response.total_items
    }

    async fetchResults(onData, { after } = {}) {
        let url = `${this.endpoint}/forms/${this.config.typeform.id}/responses?completed=true&sort=submitted_at,asc&page_size=${BATCH_SIZE}`
        if (after !== undefined) {
            url = `${url}&after=${after}`
        }

        const rawResponse = await fetch(url, {
            method: 'GET',
            headers: { authorization: `bearer ${this.apiToken}` },
        })
        const response = await rawResponse.json()

        if (response.items.length === 0) return

        onData(this.processResults(response.items))

        await this.fetchResults(onData, { after: last(response.items).token })
    }

    processResults(items) {
        return items.map(({ answers, ...response }) => {
            const normalized = {
                survey: this.config.id,
                ...response,
                tools: {},
                other_tools: {},
                happiness: {},
                user_info: {},
            }

            if (answers === undefined) {
                return
            }

            answers.forEach(answer => {
                const fieldConfig = this.config.typeform.fields[answer.field.id]

                if (fieldConfig === undefined) {
                    // console.log(answer)
                    return
                }

                switch (fieldConfig.type) {
                    case types.FIELD_TYPE_TOOL:
                        const opinion = this.config.experience[answer.choice.label]
                        if (opinion === undefined) {
                            throw new Error(`Unable to convert answer to opinion id: ${answer.choice.label}`)
                        }
                        if (normalized.tools[fieldConfig.tool] === undefined) {
                            normalized.tools[fieldConfig.tool] = {}
                        }
                        normalized.tools[fieldConfig.tool].opinion = opinion
                        return

                    case types.FIELD_TYPE_TOOL_LIKE_REASONS:
                        if (normalized.tools[fieldConfig.tool] === undefined) {
                            normalized.tools[fieldConfig.tool] = {}
                        }
                        normalized.tools[fieldConfig.tool].like = answer.choices.labels
                        return

                    case types.FIELD_TYPE_TOOL_DISLIKE_REASONS:
                        if (normalized.tools[fieldConfig.tool] === undefined) {
                            normalized.tools[fieldConfig.tool] = {}
                        }
                        normalized.tools[fieldConfig.tool].dislike = answer.choices.labels
                        return

                    case types.FIELD_TYPE_HAPPINESS:
                        normalized.happiness[fieldConfig.section] = answer.number
                        return

                    case types.FIELD_TYPE_OTHER_TOOLS:
                        const value = util.cleanupValue(answer.text)
                        if (value !== null) {
                            normalized.other_tools[fieldConfig.section] = {
                                raw: value,
                                norm: otherToolsExtractor(value),
                            }
                        }
                        return

                    case types.FIELD_TYPE_YEARS_OF_EXPERIENCE:
                        const yearsExperienceRange = userInfo.yearsOfExperienceRangeByLabel[answer.choice.label]
                        if (yearsExperienceRange === undefined) {
                            throw new Error(`Unknown years of experience range ${answer.choice.label}`)
                        }
                        normalized.user_info[types.FIELD_TYPE_YEARS_OF_EXPERIENCE] = yearsExperienceRange.id
                        return

                    case types.FIELD_TYPE_COMPANY_SIZE:
                        const companySize = userInfo.companySizeByLabel[answer.choice.label]
                        if (companySize === undefined) {
                            throw new Error(`Unknown company size ${answer.choice.label}`)
                        }
                        normalized.user_info[types.FIELD_TYPE_COMPANY_SIZE] = companySize.id
                        return

                    case types.FIELD_TYPE_SALARY:
                        const salaryRange = userInfo.salaryRangeByLabel[answer.choice.label]
                        if (salaryRange === undefined) {
                            throw new Error(`Unknown salary range ${answer.choice.label}`)
                        }
                        normalized.user_info[types.FIELD_TYPE_SALARY] = salaryRange.id
                        return

                    case types.FIELD_TYPE_EMAIL:
                        normalized.user_info[types.FIELD_TYPE_EMAIL] = answer.email
                        return

                    case types.FIELD_TYPE_SOURCE:
                        normalized.user_info[types.FIELD_TYPE_SOURCE] = answer.text
                        return
                }
            })

            return normalized
        })
    }
}

module.exports = TypeformExtractor