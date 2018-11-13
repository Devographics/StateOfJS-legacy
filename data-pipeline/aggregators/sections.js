const elastic = require('../loaders/elastic')

exports.happiness = async (sections, surveys, config) => {
    const aggs = await elastic.aggs(
        sections.reduce(
            (acc, section) => ({
                ...acc,
                [section]: {
                    terms: {
                        field: `happiness.${section}`,
                        size: sections.length
                    },
                    aggs: {
                        survey: {
                            terms: {
                                field: 'survey.keyword',
                                size: surveys.length
                            }
                        }
                    }
                }
            }),
            {}
        )
    )

    const happinessAggs = {}
    Object.keys(aggs.aggregations).forEach(section => {
        const sectionAgg = aggs.aggregations[section]

        const all = sectionAgg.buckets.reduce((acc, bucket) => {
            return {
                ...acc,
                [bucket.key]: bucket.doc_count
            }
        }, {})

        const bySurvey = {}
        const appearsInSurveys = surveys.filter(s => config[s].sections[section] !== undefined)
        appearsInSurveys.forEach(survey => {
            bySurvey[survey] = sectionAgg.buckets.reduce((acc, bucket) => {
                const subBucket = bucket.survey.buckets.find(b => b.key === survey)
                if (subBucket === undefined) {
                    return {
                        ...acc,
                        [bucket.key]: 0
                    }
                }

                return {
                    ...acc,
                    [bucket.key]: subBucket.doc_count
                }
            }, {})
        })

        happinessAggs[section] = {
            surveys: appearsInSurveys,
            all,
            ...bySurvey
        }
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
