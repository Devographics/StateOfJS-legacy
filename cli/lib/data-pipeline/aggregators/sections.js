const elastic = require('../loaders/elastic')

exports.happiness = async (sections, surveys, config) => {
    const aggs = await elastic.aggs(
        sections.reduce(
            (acc, section) => ({
                ...acc,
                [section]: {
                    terms: {
                        field: 'survey.keyword',
                        size: surveys.length,
                    },
                    aggs: {
                        scores: {
                            terms: {
                                field: `happiness.${section}`,
                                size: 5,
                            },
                        },
                    },
                },
            }),
            {}
        )
    )

    const happinessAggs = {}
    Object.keys(aggs.aggregations).forEach(section => {
        const sectionAgg = aggs.aggregations[section]

        const bySurvey = []
        const appearsInSurveys = surveys.filter(s => config[s].sections[section] !== undefined)
        appearsInSurveys.forEach(survey => {
            const surveyBucket = sectionAgg.buckets.find(b => b.key === survey)
            const scores = surveyBucket.scores.buckets.map(bucket => ({
                score: bucket.key,
                count: bucket.doc_count,
                percentage: Number((bucket.doc_count / surveyBucket.doc_count * 100).toFixed(1))
            }))
            const responseCount = scores.reduce((total, score) => total + score.count, 0)
            const totalScore = scores.reduce((total, score) => total + score.count * score.score, 0)
            const average = Number((totalScore / responseCount).toFixed(1))

            bySurvey.push({
                survey,
                scores,
                average, 
            })
        })

        happinessAggs[section] = bySurvey
    })

    return happinessAggs
}

/**
 * Compute other tools for each sections
 * for a given survey, tools which are already part
 * of the survey's selected tools are excluded.
 */
exports.otherToolsForSurvey = async surveyConfig => {
    const sections = Object.keys(surveyConfig.sections)
    const { tools } = surveyConfig

    const body = {
        query: {
            bool: {
                must: [
                    {
                        term: {
                            'survey.keyword': surveyConfig.id,
                        },
                    },
                ],
            },
        },
        aggs: sections.reduce((acc, section) => ({
            ...acc,
            [section]: {
                terms: {
                    field: `sections_other_tools.${section}.norm.keyword`,
                    size: 100,
                    min_doc_count: 10,
                    exclude: tools,
                },
            },
        }), {}),
    }

    const result = await elastic.search({
        size: 0,
        body,
    })

    const otherToolsAggs = {}
    for (let section in result.aggregations) {
        const sectionAggs = result.aggregations[section]
        otherToolsAggs[section] = sectionAggs.buckets.map(bucket => {
            return {
                name: bucket.key,
                count: bucket.doc_count,
            }
        })
    }

    return otherToolsAggs
}
