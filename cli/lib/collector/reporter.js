'use strict'

const config = require('@ekino/config')
const elastic = require('./elastic')
const dto = require('./dto')
const charts = require('./charts')

const OTHERS_AGG_SIZE = 20

const reportConfig = config.get('report')

const otherToolsKeys = ['Package Managers', 'Utility Libraries', 'Text Editors', 'Code Linters']

const featuresKeys = [
    'Server-Side Rendering',
    'Code Splitting',
    'Optimistic Updates',
    'Hot Module Reloading',
    'Time-Travel Debugging',
    'Real-Time Operations',
    'Dead Code Elimination',
    'Progressive Enhancement',
    'Service Workers',
    'Offline Usage',
]

const opinionKeys = [
    'JavaScript is moving in the right direction',
    'Building JavaScript apps is overly complex right now',
    'JavaScript is over-used online',
    'I enjoy building JavaScript apps',
    'I would like JavaScript to be my main programming language',
    'The JavaScript ecosystem is changing too fast',
    'This survey is too damn long!',
]

const surveyKeys = ['browser', 'city', 'device', 'location', 'os', 'referrer']

const usersKeys = ['Yearly Salary', 'Years of Experience', 'Company Size']

const allTools = [
    'frontend',
    'flavors',
    'stateManagement',
    'styleManagement',
    'backend',
    'testing',
    'buildTools',
    'mobile'
].reduce((all, key) => [...all, ...reportConfig[key].keys], [])

exports.experiencePairing = async (
    leftKeys,
    righKeys,
    commonResponse = "I've USED it before, and WOULD use it again"
) => {
    const rightAggs = righKeys.reduce((aggs, field) => {
        aggs[field] = {
            filter: { term: { [field]: commonResponse } },
        }

        return aggs
    }, {})

    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: leftKeys.reduce((aggs, field) => {
                aggs[field] = {
                    filter: { term: { [field]: commonResponse } },
                    aggs: rightAggs,
                }

                return aggs
            }, {}),
        },
    })

    return result.aggregations
}

exports.experienceByUsers = async (
    fields,
    experience = "I've USED it before, and WOULD use it again"
) => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: fields.reduce((aggs, field) => {
                aggs[field] = {
                    filter: { term: { [field]: experience } },
                    aggs: {
                        by_location: { terms: { field: 'location' } },
                        by_salary: { terms: { field: 'Yearly Salary' } },
                        by_experience: { terms: { field: 'Years of Experience' } },
                    },
                }

                return aggs
            }, {}),
        },
    })

    const all = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: {
                bool: {
                    should: fields.map(field => ({
                        term: { [field]: experience }
                    }))
                }
            },
            aggs: {
                by_salary: { terms: { field: 'Yearly Salary' } },
                by_experience: { terms: { field: 'Years of Experience' } },
                //by_location: { terms: { field: 'location' } },
            },
        },
    })

    result.aggregations.Aggregated = Object.assign({}, all.aggregations, {
        doc_count: all.hits.total
    })

    return result.aggregations
}

/**
 * Retrieve usage (I've USED it before, and WOULD use it again),
 * and compute stats per country.
 *
 * @param {Array.<string>} fields - The fields you wish to retrieve
 * @return {Promise.<Array.<Object>>} Corresponding buckets
 */
exports.distributionByCountry = async fields => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: { match_all: {} },
            aggs: {
                country: {
                    terms: { field: 'location', size: 32 },
                    aggs: fields.reduce((aggs, field) => {
                        aggs[field] = {
                            filter: {
                                term: { [field]: "I've USED it before, and WOULD use it again" },

                            },
                        }

                        return aggs
                    }, {}),
                },
            },
        },
    })

    return result.aggregations.country.buckets
}

exports.toolsUsageCounts = async tools => {
    console.log(tools)

    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: {
                bool: {
                    should: [
                        { term:  { 'React': "I've USED it before, and WOULD use it again" } },
                        { term:  { 'React': "I've USED it before, and would NOT use it again" } },
                    ]
                }
            },
            aggs: {
                country: {
                    terms: { field: 'React' },
                },
            },
        },
    })

    console.log(result)
}

exports.frontend = async () => {
    const experience = await elastic.termsAggs(reportConfig.frontend.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.frontend.keys)
    const others = await elastic.termsAgg(reportConfig.frontend.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.frontend.keys)

    return {
        keys: reportConfig.frontend.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.frontend.freeform],
    }
}

exports.flavor = async () => {
    const experience = await elastic.termsAggs(reportConfig.flavors.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.flavors.keys)
    const countries = await exports.distributionByCountry(reportConfig.flavors.keys)

    return {
        keys: reportConfig.flavors.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
    }
}

exports.state = async () => {
    const experience = await elastic.termsAggs(reportConfig.stateManagement.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.stateManagement.keys)
    const others = await elastic.termsAgg(reportConfig.stateManagement.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.stateManagement.keys)

    return {
        keys: reportConfig.stateManagement.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.stateManagement.freeform],
    }
}

exports.style = async () => {
    const experience = await elastic.termsAggs(reportConfig.styleManagement.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.styleManagement.keys)
    const others = await elastic.termsAgg(reportConfig.styleManagement.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.styleManagement.keys)

    return {
        keys: reportConfig.styleManagement.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.styleManagement.freeform],
    }
}

exports.backend = async () => {
    const experience = await elastic.termsAggs(reportConfig.backend.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.backend.keys)
    const others = await elastic.termsAgg(reportConfig.backend.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.backend.keys)

    return {
        keys: reportConfig.backend.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.backend.freeform],
    }
}

exports.testing = async () => {
    const experience = await elastic.termsAggs(reportConfig.testing.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.testing.keys)
    const others = await elastic.termsAgg(reportConfig.testing.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.testing.keys)

    return {
        keys: reportConfig.testing.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.testing.freeform],
    }
}

exports.build = async () => {
    const experience = await elastic.termsAggs(reportConfig.buildTools.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.buildTools.keys)
    const others = await elastic.termsAgg(reportConfig.buildTools.freeform, OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(reportConfig.buildTools.keys)

    return {
        keys: reportConfig.buildTools.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.buildTools.freeform],
    }
}

exports.mobile = async () => {
    const experience = await elastic.termsAggs(reportConfig.mobile.keys)
    const experienceByUsers = await exports.experienceByUsers(reportConfig.mobile.keys)
    const countries = await exports.distributionByCountry(reportConfig.mobile.keys)

    return {
        keys: reportConfig.mobile.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
    }
}

exports.allToolsPairing = async () => {
    const allToolsPairing = await exports.experiencePairing(allTools, allTools)

    return {
        chord: charts.chord(allTools, allTools, allToolsPairing)
    }
}

exports.features = async () => {
    const aggs = await elastic.termsAggs(featuresKeys, 400)
    const others = await elastic.termsAgg('Other Features', OTHERS_AGG_SIZE)

    return {
        keys: featuresKeys,
        aggs: dto.aggregations(aggs.aggregations),
        others: others.aggregations['Other Features'],
    }
}

exports.opinion = async () => {
    const aggs = await elastic.termsAggs(opinionKeys)

    return {
        keys: opinionKeys,
        aggs: dto.aggregations(aggs.aggregations),
    }
}

exports.otherTools = async () => {
    const aggs = await elastic.termsAggs(otherToolsKeys, 12)

    return {
        keys: otherToolsKeys,
        aggs: aggs.aggregations,
    }
}

exports.users = async () => {
    const aggs = await elastic.termsAggs(usersKeys)

    return dto.aggregations(aggs.aggregations)
}

exports.survey = async () => {
    const aggs = await elastic.termsAggs(surveyKeys, 400)

    return dto.aggregations(aggs.aggregations)
}

exports.comments = async () => {
    const result = await elastic.client.search({
        index: config.get('elastic.index'),
        // There are 3735 comments
        size: 4000,
        _source: ['Other Comments', 'location'],
        body: {
            query: {
                constant_score: {
                    filter: { exists: { field: 'Other Comments' } },
                },
            },
        },
    })

    return result.hits.hits.map(item => ({
        content: item._source['Other Comments'],
        location: item._source.location,
    }))
}
