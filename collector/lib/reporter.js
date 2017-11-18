'use strict'

const config = require('@ekino/config')
const elastic = require('./elastic')
const dto = require('./dto')
const charts = require('./charts')

const OTHERS_AGG_SIZE = 20

const frontendKeys = [
    'React',
    'Angular',
    'Angular 2',
    'Ember',
    'Vue',
    'Backbone',
    'Polymer',
    'Aurelia',
    'No Front-End Framework',
]

const flavorKeys = [
    '"Plain" JavaScript (ES5)',
    'ES6',
    'TypeScript',
    'Flow',
    'Elm',
    'ClojureScript',
    'Reason',
]

const stateKeys = [
    'REST API',
    'Redux',
    'MobX',
    'GraphQL',
    'Relay/Relay Modern',
    'Falcor',
    'Apollo',
    'Firebase',
]

const styleKeys = [
    'Plain CSS',
    'SASS/SCSS',
    'Stylus',
    'LESS',
    'CSS-in-JS',
    'Bootstrap',
    'Foundation',
]

const backendKeys = [
    'Meteor',
    'Express',
    'Koa',
    'Hapi',
    'FeathersJS',
    'Sails',
    'Loopback',
    'Keystone',
]

const testingKeys = ['Mocha', 'Jasmine', 'Enzyme', 'Jest', 'Tape', 'Ava']

const buildKeys = ['Webpack', 'Grunt', 'Gulp', 'Browserify', 'NPM', 'Rollup']

const mobileKeys = [
    'Native Apps',
    'React Native',
    'Ionic',
    'PhoneGap/Cordova',
    'NativeScript',
    'Electron',
]

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

    return elastic.client.search({
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

exports.frontend = async () => {
    const experience = await elastic.termsAggs(frontendKeys)
    const experienceByUsers = await exports.experienceByUsers(frontendKeys)
    const others = await elastic.termsAgg('Other Front-End Frameworks', OTHERS_AGG_SIZE)
    const flavor = await exports.experiencePairing(frontendKeys, flavorKeys)
    const state = await exports.experiencePairing(frontendKeys, stateKeys)
    const style = await exports.experiencePairing(frontendKeys, styleKeys)
    const countries = await exports.distributionByCountry(frontendKeys)

    return {
        keys: frontendKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other Front-End Frameworks'],
        flavorChord: charts.chord(frontendKeys, flavorKeys, flavor.aggregations),
        flavorSankey: charts.sankey(frontendKeys, flavorKeys, flavor.aggregations),
        stateChord: charts.chord(frontendKeys, stateKeys, state.aggregations),
        stateSankey: charts.sankey(frontendKeys, stateKeys, state.aggregations),
        styleChord: charts.chord(frontendKeys, styleKeys, style.aggregations),
        styleSankey: charts.sankey(frontendKeys, styleKeys, style.aggregations),
    }
}

exports.flavor = async () => {
    const experience = await elastic.termsAggs(flavorKeys)
    const experienceByUsers = await exports.experienceByUsers(flavorKeys)
    const frontend = await exports.experiencePairing(flavorKeys, frontendKeys)
    const countries = await exports.distributionByCountry(flavorKeys)

    return {
        keys: flavorKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        frontendChord: charts.chord(flavorKeys, frontendKeys, frontend.aggregations),
        frontendSankey: charts.sankey(flavorKeys, frontendKeys, frontend.aggregations),
    }
}

exports.state = async () => {
    const experience = await elastic.termsAggs(stateKeys)
    const experienceByUsers = await exports.experienceByUsers(stateKeys)
    const others = await elastic.termsAgg('Other Data Management Solutions', OTHERS_AGG_SIZE)
    const frontend = await exports.experiencePairing(stateKeys, frontendKeys)
    const countries = await exports.distributionByCountry(stateKeys)

    return {
        keys: stateKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other Data Management Solutions'],
        frontendChord: charts.chord(stateKeys, frontendKeys, frontend.aggregations),
        frontendSankey: charts.sankey(stateKeys, frontendKeys, frontend.aggregations),
    }
}

exports.style = async () => {
    const experience = await elastic.termsAggs(styleKeys)
    const experienceByUsers = await exports.experienceByUsers(styleKeys)
    const others = await elastic.termsAgg('Other CSS solutions', OTHERS_AGG_SIZE)
    const frontend = await exports.experiencePairing(styleKeys, frontendKeys)
    const countries = await exports.distributionByCountry(styleKeys)

    return {
        keys: styleKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other CSS solutions'],
        frontendChord: charts.chord(styleKeys, frontendKeys, frontend.aggregations),
        frontendSankey: charts.sankey(styleKeys, frontendKeys, frontend.aggregations),
    }
}

exports.backend = async () => {
    const experience = await elastic.termsAggs(backendKeys)
    const experienceByUsers = await exports.experienceByUsers(backendKeys)
    const others = await elastic.termsAgg('Other Back-End Tools', OTHERS_AGG_SIZE)
    const countries = await exports.distributionByCountry(backendKeys)

    return {
        keys: backendKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other Back-End Tools'],
    }
}

exports.testing = async () => {
    const experience = await elastic.termsAggs(testingKeys)
    const experienceByUsers = await exports.experienceByUsers(testingKeys)
    const others = await elastic.termsAgg('Other testing frameworks', OTHERS_AGG_SIZE)
    const frontend = await exports.experiencePairing(testingKeys, frontendKeys)
    const backend = await exports.experiencePairing(testingKeys, backendKeys)
    const countries = await exports.distributionByCountry(testingKeys)

    return {
        keys: testingKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other testing frameworks'],
        frontendChord: charts.chord(testingKeys, frontendKeys, frontend.aggregations),
        frontendSankey: charts.sankey(testingKeys, frontendKeys, frontend.aggregations),
        backendChord: charts.chord(testingKeys, backendKeys, backend.aggregations),
        backendSankey: charts.sankey(testingKeys, backendKeys, backend.aggregations),
    }
}

exports.build = async () => {
    const experience = await elastic.termsAggs(buildKeys)
    const experienceByUsers = await exports.experienceByUsers(buildKeys)
    const others = await elastic.termsAgg('Other build tools', OTHERS_AGG_SIZE)
    const frontend = await exports.experiencePairing(buildKeys, frontendKeys)
    const countries = await exports.distributionByCountry(buildKeys)

    return {
        keys: buildKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
        others: others.aggregations['Other build tools'],
        frontendChord: charts.chord(buildKeys, frontendKeys, frontend.aggregations),
        frontendSankey: charts.sankey(buildKeys, frontendKeys, frontend.aggregations),
    }
}

exports.mobile = async () => {
    const experience = await elastic.termsAggs(mobileKeys)
    const experienceByUsers = await exports.experienceByUsers(mobileKeys)
    const countries = await exports.distributionByCountry(mobileKeys)

    return {
        keys: mobileKeys,
        experience: dto.aggregations(experience.aggregations),
        experienceByUsers,
        countries,
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
