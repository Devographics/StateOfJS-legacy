const elastic = require('../loaders/elastic')

exports.toolBySimilarOpinionForSurvey = async (tools, opinion, survey) => {
    const max = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        },
                        ...tools.map(tool => ({
                            term: {
                                [`tools.${tool}.opinion`]: opinion
                            }
                        }))
                    ]
                }
            }
        }
    })
    console.log(
        require('util').inspect(
            {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        },
                        ...tools.map(tool => ({
                            term: {
                                [`tools.${tool}.opinion`]: opinion
                            }
                        }))
                    ]
                }
            },
            { depth: null, colors: true }
        )
    )
    console.log(`max (${tools.length} tools):`, max.hits.total)

    const none = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        }
                    ],
                    must_not: tools.map(tool => ({
                        term: {
                            [`tools.${tool}.opinion`]: opinion
                        }
                    }))
                }
            }
        }
    })
    console.log(
        require('util').inspect(
            {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        }
                    ],
                    must_not: tools.map(tool => ({
                        term: {
                            [`tools.${tool}.opinion`]: opinion
                        }
                    }))
                }
            },
            { depth: null, colors: true }
        )
    )
    console.log(`none (0 tool):`, none.hits.total)

    const totalScript = `
        def fields = [\"${tools.map(tool => `tools.${tool}.opinion.keyword`).join('", "')}\"];

        def total = 0;
        for (int i = 0; i < fields.length; i++) {
            if(doc[fields[i]][0] == \"${opinion}\") {
                total += 1;
            }
        }
        
        return total;
    `
        .trim()
        .replace(/\r?\n|\r/g, ' ')

    //console.log(totalScript)

    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        }
                    ]
                }
            },
            aggs: {
                by_count: {
                    terms: {
                        script: {
                            lang: 'painless',
                            source: totalScript
                        },
                        order: { _key: 'asc' }
                    }
                }
            }
        }
    })

    console.log(require('util').inspect(result.aggregations, { depth: null, colors: true }))

    //console.log('total', result.aggregations.by_count.buckets.reduce((t, b) => t + b.doc_count, 0))

    /*
    return sortBy(
        result.aggregations.by_count.buckets.map(bucket => ({
            ...bucket,
            key: Number(bucket.key)
        })),
        'key'
    )
    */
}

exports.toolsBySimilarOpinionForSurvey = async (sections, opinion, survey) => {
    const bySection = {}
    for (let section in sections) {
        const { tools } = sections[section]
        console.log('—————————————————————————————————————————')
        console.log(survey, section, tools)
        bySection[section] = await exports.toolBySimilarOpinionForSurvey(tools, opinion, survey)
    }
}

exports.happiness = async (sections, surveys, config) => {
    const aggs = await elastic.aggs(
        sections.reduce(
            (acc, section) => ({
                ...acc,
                [section]: {
                    terms: {
                        field: 'survey.keyword',
                        size: surveys.length
                    },
                    aggs: {
                        scores: {
                            terms: {
                                field: `happiness.${section}`,
                                size: 5
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

        const bySurvey = []
        const appearsInSurveys = surveys.filter(s => config[s].sections[section] !== undefined)
        appearsInSurveys.forEach(survey => {
            const surveyBucket = sectionAgg.buckets.find(b => b.key === survey)
            const scores = surveyBucket.scores.buckets.map(bucket => ({
                score: bucket.key,
                count: bucket.doc_count,
                percentage: Number(((bucket.doc_count / surveyBucket.doc_count) * 100).toFixed(1))
            }))
            const responseCount = scores.reduce((total, score) => total + score.count, 0)
            const totalScore = scores.reduce((total, score) => total + score.count * score.score, 0)
            const average = Number((totalScore / responseCount).toFixed(1))

            bySurvey.push({
                survey,
                scores,
                average
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
                            'survey.keyword': surveyConfig.id
                        }
                    }
                ]
            }
        },
        aggs: sections.reduce(
            (acc, section) => ({
                ...acc,
                [section]: {
                    terms: {
                        field: `sections_other_tools.${section}.norm.keyword`,
                        size: 100,
                        min_doc_count: 10,
                        exclude: tools
                    }
                }
            }),
            {}
        )
    }

    const result = await elastic.search({
        size: 0,
        body
    })

    const otherToolsAggs = {}
    for (let section in result.aggregations) {
        const sectionAggs = result.aggregations[section]
        otherToolsAggs[section] = sectionAggs.buckets.map(bucket => {
            return {
                name: bucket.key,
                count: bucket.doc_count
            }
        })
    }

    return otherToolsAggs
}
