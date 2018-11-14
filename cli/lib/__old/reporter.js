'use strict'

const config = require('@ekino/config')
const elastic = require('./elastic')
const dto = require('./dto')
const charts = require('./charts')
const aggregators = require('./aggregators')

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
    'Offline Usage'
]

const opinionKeys = [
    'JavaScript is moving in the right direction',
    'Building JavaScript apps is overly complex right now',
    'JavaScript is over-used online',
    'I enjoy building JavaScript apps',
    'I would like JavaScript to be my main programming language',
    'The JavaScript ecosystem is changing too fast',
    'This survey is too damn long!'
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

exports.frontend = async () => {
    const experience = await elastic.termsAggs(reportConfig.frontend.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.frontend.keys)
    const others = await elastic.termsAgg(reportConfig.frontend.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.frontend.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.frontend.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five cats, how happy are you with your current solution for the front-end?'
    )

    return {
        keys: reportConfig.frontend.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.frontend.freeform],
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.flavor = async () => {
    const experience = await elastic.termsAggs(reportConfig.flavors.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.flavors.keys)
    const countries = await aggregators.toolsByCountry(reportConfig.flavors.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.flavors.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five dogs, how happy are you with your current flavor of JavaScript?'
    )

    return {
        keys: reportConfig.flavors.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.state = async () => {
    const experience = await elastic.termsAggs(reportConfig.stateManagement.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.stateManagement.keys)
    const others = await elastic.termsAgg(reportConfig.stateManagement.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.stateManagement.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.stateManagement.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five thunderbolts, how happy are you with your current solution for state management?'
    )

    return {
        keys: reportConfig.stateManagement.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.stateManagement.freeform],
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.style = async () => {
    const experience = await elastic.termsAggs(reportConfig.styleManagement.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.styleManagement.keys)
    const others = await elastic.termsAgg(reportConfig.styleManagement.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.styleManagement.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.styleManagement.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five lightbulbs, how happy are you with the current state of CSS?'
    )

    return {
        keys: reportConfig.styleManagement.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.styleManagement.freeform],
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.backend = async () => {
    const experience = await elastic.termsAggs(reportConfig.backend.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.backend.keys)
    const others = await elastic.termsAgg(reportConfig.backend.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.backend.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.backend.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five trophies, how happy are you with your current back-end solution?'
    )

    return {
        keys: reportConfig.backend.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.backend.freeform],
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.testing = async () => {
    const experience = await elastic.termsAggs(reportConfig.testing.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.testing.keys)
    const others = await elastic.termsAgg(reportConfig.testing.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.testing.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.testing.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five severed hands, how happy are you with the current state of JavaScript testing?'
    )

    return {
        keys: reportConfig.testing.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations[reportConfig.testing.freeform],
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.build = async () => {
    const experience = await elastic.termsAggs(reportConfig.buildTools.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.buildTools.keys)
    const others = await elastic.termsAgg(reportConfig.buildTools.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.buildTools.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.buildTools.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five droplets, how happy are you with the current state of build tools?'
    )

    return {
        keys: reportConfig.buildTools.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        others: others.aggregations[reportConfig.buildTools.freeform],
        countries,
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.mobile = async () => {
    const experience = await elastic.termsAggs(reportConfig.mobile.keys)
    const experienceByUsers = await aggregators.experienceByUsers(reportConfig.mobile.keys)
    const others = await elastic.termsAgg(reportConfig.mobile.freeform, OTHERS_AGG_SIZE)
    const countries = await aggregators.toolsByCountry(reportConfig.mobile.keys)
    const numberOfToolsUsed = await aggregators.numberOfToolsUsed(reportConfig.mobile.keys)
    const happiness = await aggregators.average(
        'On a scale of one to five pencils, how happy are you with the current state of mobile apps?'
    )

    return {
        keys: reportConfig.mobile.keys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        others: others.aggregations[reportConfig.mobile.freeform],
        countries,
        numberOfToolsUsed,
        happiness: Number(happiness.toPrecision(2))
    }
}

exports.allToolsUsage = async () => {
    const allToolsUsage = await aggregators.toolsUsage(allTools)

    return {
        allToolsUsage
    }
}

exports.allToolsPairing = async () => {
    const allToolsPairing = await aggregators.toolsPairing(allTools, allTools)

    return {
        chord: charts.chord(allTools, allToolsPairing)
    }
}

exports.features = async () => {
    const aggs = await elastic.termsAggs(featuresKeys, 400)
    const others = await elastic.termsAgg('Other Features', OTHERS_AGG_SIZE)

    return {
        keys: featuresKeys,
        aggs: dto.aggregations(aggs.aggregations),
        others: others.aggregations['Other Features']
    }
}

exports.opinion = async () => {
    const aggs = await elastic.termsAggs(opinionKeys)

    return {
        keys: opinionKeys,
        aggs: dto.aggregations(aggs.aggregations)
    }
}

exports.otherTools = async () => {
    const aggs = await elastic.termsAggs(otherToolsKeys, 12)

    return {
        keys: otherToolsKeys,
        aggs: aggs.aggregations
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
                    filter: { exists: { field: 'Other Comments' } }
                }
            }
        }
    })

    return result.hits.hits.map(item => ({
        content: item._source['Other Comments'],
        location: item._source.location
    }))
}
