'use strict'

const { maxBy } = require('lodash')
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

const salaryAverages = {
    'I work for free :(': 0,
    '$0-$10k': 5,
    '$10-$30k': 20,
    '$30-50k': 40,
    '$50-$100k': 75,
    '$100k-$200k': 150,
    '$200k+': 250,
}

const yearsOfExperienceAverages = {
    'Less than one year': 0.5,
    '1-2 years': 1.5,
    '2-5 years': 3.5,
    '5-10 years': 7.5,
    '10-20 years': 15,
    '20+ years': 22.5,
}

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

/**
 * Fix percentages for a given set of buckets.
 * Because rounding often ends up with a value != 100%,
 * we take the higher bucket and apply the diff on its average.
 *
 * Be aware that this function may mutates the higher bucket.
 *
 * @param {Array.<Object>} buckets
 */
exports.fixBucketsPercentages = buckets => {
    const total = buckets.reduce((t, { percentage }) => t + percentage, 0)

    const diff = 100 - total
    if (diff !== 0) {
        const higherBucket = maxBy(buckets, 'percentage')
        higherBucket.percentage = higherBucket.percentage + diff
    }
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
            },
        },
    })

    result.aggregations.Aggregated = Object.assign({}, all.aggregations, {
        doc_count: all.hits.total
    })

    const allFields = ['Aggregated', ...fields]
    allFields.forEach(field => {
        const total = result.aggregations[field].doc_count

        let salaryBuckets = result.aggregations[field].by_salary.buckets

        // compute percentages
        salaryBuckets = salaryBuckets.map(bucket => Object.assign({}, bucket, {
            percentage: Math.round(bucket.doc_count / total * 100)
        }))
        exports.fixBucketsPercentages(salaryBuckets)
        result.aggregations[field].by_salary.buckets = salaryBuckets

        // compute average salary for given tool
        const totalSalary = salaryBuckets.reduce((t, bucket) => {
            const rangeAverage = salaryAverages[bucket.key]
            const numberOfUsersInRange = bucket.doc_count

            return t + rangeAverage * numberOfUsersInRange
        }, 0)
        result.aggregations[field].by_salary.average = Math.round(totalSalary / total)

        let yearsOfExperienceBuckets = result.aggregations[field].by_experience.buckets

        // compute percentages
        yearsOfExperienceBuckets = yearsOfExperienceBuckets.map(bucket => Object.assign({}, bucket, {
            percentage: Math.round(bucket.doc_count / total * 100)
        }))
        exports.fixBucketsPercentages(yearsOfExperienceBuckets)
        result.aggregations[field].by_experience.buckets = yearsOfExperienceBuckets

        // compute average years of XP for given years of XP
        const totalYearsOfExperience = yearsOfExperienceBuckets.reduce((t, bucket) => {
            const rangeAverage = yearsOfExperienceAverages[bucket.key]
            const numberOfUsersInRange = bucket.doc_count

            return t + rangeAverage * numberOfUsersInRange
        }, 0)
        result.aggregations[field].by_experience.average = Math.round(totalYearsOfExperience / total)
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
