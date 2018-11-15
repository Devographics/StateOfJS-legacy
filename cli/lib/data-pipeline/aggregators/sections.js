const elastic = require('../loaders/elastic')
const constants = require('../../../conf/constants')

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

exports.toolsOpinionUserInfoDistribution = async (surveyConfig, opinion) => {
    const { tools } = surveyConfig

    const result = await elastic.search({
        size: 0,
        body: {
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
            aggs: tools.reduce(
                (acc, tool) => ({
                    ...acc,
                    [tool]: {
                        filter: {
                            term: {
                                [`tools.${tool}.opinion.keyword`]: opinion
                            }
                        },
                        aggs: {
                            salary: {
                                terms: {
                                    field: `user_info.salary.keyword`
                                }
                            },
                            company_size: {
                                terms: {
                                    field: `user_info.company_size.keyword`
                                }
                            },
                            years_of_experience: {
                                terms: {
                                    field: `user_info.years_of_experience.keyword`
                                }
                            }
                        }
                    }
                }),
                {}
            )
        }
    })

    return Object.keys(surveyConfig.sections).reduce((acc, sectionId) => {
        const section = surveyConfig.sections[sectionId]

        const by_salary = []
        const by_company_size = []
        const by_years_of_experience = []

        section.tools.forEach(tool => {
            const toolAggs = result.aggregations[tool]
            const total = toolAggs.doc_count

            const salaryTotal = toolAggs.salary.buckets.reduce((t, bucket) => {
                return t + constants.salaryRangeAverages[bucket.key] * bucket.doc_count
            }, 0)
            const companySizeTotal = toolAggs.company_size.buckets.reduce((t, bucket) => {
                return t + constants.companySizeAverages[bucket.key] * bucket.doc_count
            }, 0)
            const yearsOfExperienceTotal = toolAggs.years_of_experience.buckets.reduce(
                (t, bucket) => {
                    return t + constants.yearsOfExperienceAverages[bucket.key] * bucket.doc_count
                },
                0
            )

            by_salary.push({
                tool,
                total,
                average: Number((salaryTotal / total).toFixed(1)),
                ranges: toolAggs.salary.buckets.map(bucket => ({
                    range: bucket.key.replace(/_/g, '-'),
                    count: bucket.doc_count,
                    percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                }))
            })
            by_company_size.push({
                tool,
                total,
                average: Math.round(companySizeTotal / total),
                ranges: toolAggs.company_size.buckets.map(bucket => ({
                    range: bucket.key.replace(/_/g, '-'),
                    count: bucket.doc_count,
                    percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                }))
            })
            by_years_of_experience.push({
                tool,
                total,
                average: Number((yearsOfExperienceTotal / total).toFixed(1)),
                ranges: toolAggs.years_of_experience.buckets.map(bucket => ({
                    range: bucket.key.replace(/_/g, '-'),
                    count: bucket.doc_count,
                    percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                }))
            })
        })

        return {
            ...acc,
            [sectionId]: {
                by_salary,
                by_company_size,
                by_years_of_experience
            }
        }
    }, {})
}
