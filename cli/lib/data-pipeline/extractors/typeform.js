const { last, deburr, snakeCase } = require('lodash')
const fetch = require('node-fetch')
const tools = require('../../../conf/tools')
const userInfo = require('../../../conf/user_info')
const { globalOpinionsSubjectNormalizers, sourceNormalizers } = require('../../../conf/normalize')
const types = require('./fields')
const geo = require('./geo')
const util = require('./util')

const TYPEFORM_FIELD_TYPE_MULTI_CHOICE = 'multiple_choice'
const TYPEFORM_FIELD_TYPE_RATING = 'rating'

const BATCH_SIZE = 500

const toolNormalizer = util.uniNormalizer(tools)
const otherToolsExtractor = util.multiNormalizer(tools)
const sourceNormalizer = util.uniNormalizer(sourceNormalizers)

const slugify = str => snakeCase(deburr(str))

const extractFields = (fields, registry = {}, { path = '' } = {}) => {
    fields.forEach(field => {
        if (field.type === 'statement') return

        const slug = slugify(field.title)
        registry[field.id] = {
            slug: `${path}${path !== '' ? '_' : ''}${slug}`,
            typeform_type: field.type,
        }
        if (field.type === 'group') {
            extractFields(field.properties.fields, registry, { path: `${path}${path !== '' ? '_' : ''}${slug}` })
            return
        }
    })

    return registry
}

class TypeformExtractor {
    constructor(config, { endpoint = 'https://api.typeform.com', apiToken }) {
        this.endpoint = endpoint
        this.apiToken = apiToken
        this.config = config
    }

    async fetchForm() {
        const rawResponse = await fetch(`${this.endpoint}/forms/${this.config.typeform.id}`, {
            method: 'GET',
            headers: { authorization: `bearer ${this.apiToken}` }
        })
        return rawResponse.json()
    }

    async enhanceConfig() {
        const form = await this.fetchForm()

        const experienceLabels = Object.keys(this.config.experience)
        const isExperienceField = field => {
            return (
                field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE &&
                field.properties.choices.every(choice => {
                    return experienceLabels.includes(choice.label)
                })
            )
        }

        const isLikeReasonsField = field => {
            return field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE && field.ref.endsWith('_love')
        }

        const isDislikeReasonsField = field => {
            return field.type === TYPEFORM_FIELD_TYPE_MULTI_CHOICE && field.ref.endsWith('_hate')
        }

        this.config.tools = []
        this.config.userInfo = []
        this.config.otherTools = []

        const fieldsConfig = extractFields(form.fields)

        const otherToolsField = form.fields.find(field => field.title === 'Other Tools')
        // this section does not exist for 2016
        if (otherToolsField !== undefined) {
            otherToolsField.properties.fields.forEach(field => {
                const topic = field.title.toLowerCase().replace(/ /g, '_')
                this.config.otherTools.push(topic)
                fieldsConfig[field.id] = {
                    ...fieldsConfig[field.id],
                    type: types.FIELD_TYPE_OTHER_TOOLS,
                    topic
                }
            })
        }

        const globalOpinionsField = form.fields.find(field => field.title === 'Opinion Questions')
        if (globalOpinionsField === undefined) {
            throw new Error('unable to find global opinions field')
        }
        globalOpinionsField.properties.fields.forEach(field => {
            const subject = globalOpinionsSubjectNormalizers[field.title]
            if (subject === undefined) {
                throw new Error(
                    `unable to find global opinion subject from field title: ${field.title}`
                )
            }
            fieldsConfig[field.id] = {
                ...fieldsConfig[field.id],
                type: types.FIELD_TYPE_GLOBAL_OPINION,
                subject
            }
        })

        Object.keys(this.config.sections).forEach(sectionId => {
            const sectionConfig = this.config.sections[sectionId]
            const sectionField = form.fields.find(field => field.title === sectionConfig.title)
            if (sectionField === undefined) {
                throw new Error(`no field found for section ${sectionId} (${sectionConfig.title})`)
            }

            const sectionTools = []
            sectionField.properties.fields.forEach(field => {
                if (isExperienceField(field)) {
                    const toolId = toolNormalizer(field.title)
                    fieldsConfig[field.id] = {
                        ...fieldsConfig[field.id],
                        type: types.FIELD_TYPE_TOOL,
                        tool: toolId
                    }
                    sectionTools.push(toolId)
                    this.config.tools.push(toolId)
                    return
                }

                if (field.type === TYPEFORM_FIELD_TYPE_RATING) {
                    fieldsConfig[field.id] = {
                        ...fieldsConfig[field.id],
                        type: types.FIELD_TYPE_HAPPINESS,
                        section: sectionId
                    }
                    return
                }

                if (field.title === sectionConfig.freeform) {
                    fieldsConfig[field.id] = {
                        ...fieldsConfig[field.id],
                        type: types.FIELD_TYPE_SECTION_OTHER_TOOLS,
                        section: sectionId
                    }
                    return
                }

                if (isLikeReasonsField(field)) {
                    fieldsConfig[field.id] = {
                        ...fieldsConfig[field.id],
                        type: types.FIELD_TYPE_TOOL_LIKE_REASONS,
                        tool: toolNormalizer(field.ref.slice(0, -5))
                    }
                    return
                }

                if (isDislikeReasonsField(field)) {
                    fieldsConfig[field.id] = {
                        ...fieldsConfig[field.id],
                        type: types.FIELD_TYPE_TOOL_DISLIKE_REASONS,
                        tool: toolNormalizer(field.ref.slice(0, -5))
                    }
                    return
                }
            })
            sectionConfig.tools = sectionTools

            delete sectionConfig.typeform
        })
        this.config.typeform.fields = fieldsConfig

        const aboutField = form.fields.find(field => field.title === 'About You')
        if (aboutField === undefined) {
            throw new Error('Unable to find "About You" field')
        }

        const yearsOfExperienceField = aboutField.properties.fields.find(
            field => field.title === 'Years of Experience'
        )
        if (yearsOfExperienceField === undefined) {
            throw new Error('Unable to find years of experience field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_YEARS_OF_EXPERIENCE)
        this.config.typeform.fields[yearsOfExperienceField.id] = {
            ...fieldsConfig[yearsOfExperienceField.id],
            type: types.FIELD_TYPE_YEARS_OF_EXPERIENCE
        }

        const companySizeField = aboutField.properties.fields.find(
            field => field.title === 'Company Size'
        )
        if (companySizeField === undefined) {
            throw new Error('Unable to find company size field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_COMPANY_SIZE)
        this.config.typeform.fields[companySizeField.id] = {
            ...fieldsConfig[companySizeField.id],
            type: types.FIELD_TYPE_COMPANY_SIZE
        }

        const salaryField = aboutField.properties.fields.find(
            field => field.title === 'Yearly Salary'
        )
        if (salaryField === undefined) {
            throw new Error('Unable to find salary field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_SALARY)
        this.config.typeform.fields[salaryField.id] = {
            ...fieldsConfig[salaryField.id],
            type: types.FIELD_TYPE_SALARY
        }

        const emailField = aboutField.properties.fields.find(field => field.title === 'Your Email')
        if (emailField === undefined) {
            throw new Error('Unable to find email field')
        }
        this.config.userInfo.push(types.FIELD_TYPE_EMAIL)
        this.config.typeform.fields[emailField.id] = {
            ...fieldsConfig[emailField.id],
            type: types.FIELD_TYPE_EMAIL
        }

        const sourceField = aboutField.properties.fields.find(
            field => field.title === 'How did you find out about this survey?'
        )
        if (sourceField !== undefined) {
            this.config.userInfo.push(types.FIELD_TYPE_SOURCE)
            this.config.typeform.fields[sourceField.id] = {
                ...fieldsConfig[sourceField.id],
                type: types.FIELD_TYPE_SOURCE
            }
        }

        const genderField = aboutField.properties.fields.find(
            field => field.title === 'Your Gender'
        )
        if (genderField !== undefined) {
            this.config.userInfo.push(types.FIELD_TYPE_GENDER)
            this.config.typeform.fields[genderField.id] = {
                ...fieldsConfig[genderField.id],
                type: types.FIELD_TYPE_GENDER
            }
        }

        const countryField = aboutField.properties.fields.find(
            field => field.title === 'Your Country'
        )
        if (countryField !== undefined) {
            this.config.userInfo.push(types.FIELD_TYPE_COUNTRY)
            this.config.typeform.fields[countryField.id] = {
                ...fieldsConfig[countryField.id],
                type: types.FIELD_TYPE_COUNTRY
            }
        }

        const cityField = aboutField.properties.fields.find(field => field.title === 'Your City')
        if (cityField !== undefined) {
            this.config.userInfo.push(types.FIELD_TYPE_CITY)
            this.config.typeform.fields[cityField.id] = {
                ...fieldsConfig[cityField.id],
                type: types.FIELD_TYPE_CITY
            }
        }

        //aboutField.properties.fields.forEach(field => { console.log(field.title) })
    }

    async fetchResponseCount() {
        const rawResponse = await fetch(
            `${this.endpoint}/forms/${
                this.config.typeform.id
            }/responses?completed=true&page_size=1`,
            {
                method: 'GET',
                headers: { authorization: `bearer ${this.apiToken}` }
            }
        )
        const response = await rawResponse.json()

        return response.total_items
    }

    async fetchResults(onData, { after } = {}) {
        let url = `${this.endpoint}/forms/${
            this.config.typeform.id
        }/responses?completed=true&sort=submitted_at,asc&page_size=${BATCH_SIZE}`
        if (after !== undefined) {
            url = `${url}&after=${after}`
        }

        const rawResponse = await fetch(url, {
            method: 'GET',
            headers: { authorization: `bearer ${this.apiToken}` }
        })
        const response = await rawResponse.json()

        if (response.items.length === 0) return

        try {
            const processedResults = await this.processResults(response.items)
            await onData(processedResults)

            await this.fetchResults(onData, { after: last(response.items).token })
        } catch (error) {
            console.error('An error occurred while processing typeform results', error)
        }
    }

    async normalizeResult({ answers, ...response }) {
        if (answers === undefined) return null

        const normalized = {
            survey: this.config.id,
            ...response,
            tools: {},
            sections_other_tools: {},
            other_tools: {},
            happiness: {},
            global_opinions: {},
            user_info: {}
        }

        let country
        answers.forEach(answer => {
            const fieldConfig = this.config.typeform.fields[answer.field.id]
            if (fieldConfig === undefined) {
                // console.log('UNKNOWN', answer)
                return
            }

            if (fieldConfig.type === types.FIELD_TYPE_OTHER_TOOLS) {
                let otherTools = []
                if (answer.choice !== undefined) {
                    if (answer.choice.label !== undefined) {
                        otherTools.push(toolNormalizer(answer.choice.label))
                    }
                    if (answer.choice.other !== undefined) {
                        otherTools = [
                            ...otherTools,
                            ...otherToolsExtractor(answer.choice.other)
                        ]
                    }
                }
                if (answer.choices !== undefined) {
                    if (answer.choices.labels !== undefined) {
                        otherTools = answer.choices.labels.map(tool => toolNormalizer(tool))
                    }
                    if (answer.choices.label) {
                        otherTools.push()
                    }
                    if (answer.choices.other !== undefined) {
                        otherTools = [
                            ...otherTools,
                            ...otherToolsExtractor(answer.choices.other)
                        ]
                    }
                }

                normalized.other_tools[fieldConfig.topic] = otherTools
            }

            switch (fieldConfig.type) {
                case types.FIELD_TYPE_TOOL:
                    const opinion = this.config.experience[answer.choice.label]
                    if (opinion === undefined) {
                        throw new Error(
                            `Unable to convert answer to opinion id: ${answer.choice.label}`
                        )
                    }
                    if (normalized.tools[fieldConfig.tool] === undefined) {
                        normalized.tools[fieldConfig.tool] = {}
                    }
                    normalized.tools[fieldConfig.tool].opinion = opinion
                    break

                case types.FIELD_TYPE_TOOL_LIKE_REASONS:
                    if (normalized.tools[fieldConfig.tool] === undefined) {
                        normalized.tools[fieldConfig.tool] = {}
                    }
                    normalized.tools[fieldConfig.tool].like = answer.choices.labels
                    break

                case types.FIELD_TYPE_TOOL_DISLIKE_REASONS:
                    if (normalized.tools[fieldConfig.tool] === undefined) {
                        normalized.tools[fieldConfig.tool] = {}
                    }
                    normalized.tools[fieldConfig.tool].dislike = answer.choices.labels
                    break

                case types.FIELD_TYPE_HAPPINESS:
                    // starts at 1, make it starts at 0
                    normalized.happiness[fieldConfig.section] = Number(answer.number) - 1
                    break

                case types.FIELD_TYPE_SECTION_OTHER_TOOLS:
                    const value = util.cleanupValue(answer.text)
                    if (value !== null) {
                        normalized.sections_other_tools[fieldConfig.section] = {
                            raw: value,
                            norm: otherToolsExtractor(value)
                        }
                    }
                    break

                case types.FIELD_TYPE_YEARS_OF_EXPERIENCE:
                    const yearsExperienceRange =
                        userInfo.yearsOfExperienceRangeByLabel[answer.choice.label]
                    if (yearsExperienceRange === undefined) {
                        throw new Error(
                            `Unknown years of experience range ${answer.choice.label}`
                        )
                    }
                    normalized.user_info[types.FIELD_TYPE_YEARS_OF_EXPERIENCE] =
                        yearsExperienceRange.id
                    break

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
                    break

                case types.FIELD_TYPE_EMAIL:
                    normalized.user_info[types.FIELD_TYPE_EMAIL] = answer.email
                    break

                case types.FIELD_TYPE_SOURCE:
                    normalized.user_info[types.FIELD_TYPE_SOURCE] = {
                        raw: answer.text.trim().toLowerCase(),
                        norm: sourceNormalizer(answer.text.trim().toLowerCase())
                    }
                    break

                case types.FIELD_TYPE_GENDER:
                    if (answer.choice.label !== undefined) {
                        normalized.user_info[
                            types.FIELD_TYPE_GENDER
                        ] = answer.choice.label.toLowerCase()
                    } else {
                        normalized.user_info[types.FIELD_TYPE_GENDER] = 'other'
                    }
                    break

                case types.FIELD_TYPE_COUNTRY:
                    country = answer.text.trim().toLowerCase()
                    break

                case types.FIELD_TYPE_GLOBAL_OPINION:
                    normalized.global_opinions[fieldConfig.subject] = answer.number
                    break
            }
        })

        let countryInfo
        if (country) {
            countryInfo = await geo.getCountryInfo(country)
        }
        if (!countryInfo && response.hidden && response.hidden.location) {
            countryInfo = await geo.getCountryInfo(response.hidden.location)
        }
        if (countryInfo) {
            normalized.user_info[types.FIELD_TYPE_COUNTRY] = countryInfo.country
            normalized.user_info.continent = countryInfo.continent
        } else {
            normalized.user_info[types.FIELD_TYPE_COUNTRY] = 'undefined'
            normalized.user_info.continent = 'undefined'
        }

        return normalized
    }

    toRawResult({ answers }) {
        if (answers === undefined) return null

        const result = {
            survey: this.config.id,
        }
        answers.forEach(answer => {
            const field = this.config.typeform.fields[answer.field.id]
            if (field === undefined) {
                throw new Error('no field found for answer', answer)
            }

            switch (answer.type) {
                case 'choice':
                    result[field.slug] = answer.choice.label
                    break

                case 'choices':
                    result[field.slug] = answer.choices.labels
                    break    

                case 'number':
                    result[field.slug] = answer.number
                    break

                case 'email':
                    // result[field.slug] = answer.email
                    break

                case 'text':
                    result[field.slug] = answer.text
                    break    

                default:
                    throw new Error(`non supported answer type: ${answer.type}`, answer)   
            }
        })

        return result
    }

    async processResults(items) {
        const normalizedItems = []
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const normalized = await this.normalizeResult(item)
            const raw = this.toRawResult(item)

            if (normalized === null) continue

            normalizedItems.push({
                normalized,
                raw,
            })
        }

        return normalizedItems
    }
}

module.exports = TypeformExtractor
