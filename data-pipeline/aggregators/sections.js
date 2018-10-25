const elastic = require('../loaders/elastic')

exports.happiness = async (sections, surveys, config) => {
    const aggs = await elastic.aggs(sections.reduce((acc, section) => ({
        ...acc,
        [section]: {
            terms: {
                field: `happiness.${section}`,
                size: sections.length,
            },
            aggs: {
                survey: {
                    terms: {
                        field: 'survey.keyword',
                        size: surveys.length,
                    },
                },
            },
        },
    }), {}))

    const happinessAggs = {}
    Object.keys(aggs.aggregations).forEach(section => {
        const sectionAgg = aggs.aggregations[section]

        const all = sectionAgg.buckets.reduce((acc, bucket) => {
            return {
                ...acc,
                [bucket.key]: bucket.doc_count,
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
                        [bucket.key]: 0,
                    }
                }

                return {
                    ...acc,
                    [bucket.key]: subBucket.doc_count,
                }
            }, {})
        })

        happinessAggs[section] = {
            surveys: appearsInSurveys,
            all,
            ...bySurvey,
        }
    })

    return happinessAggs
}

exports.otherTools = async (sections) => {
    const aggs = await elastic.aggs({
        surveys: {
            terms: {
                field: 'survey.keyword',
            },
            aggs: sections.reduce((acc, section) => ({
                ...acc,
                [section]: {
                    terms: {
                        field: `other_tools.${section}.norm.keyword`,
                        size: 30,
                    },
                },
            }), {}),
        },
    })

    const otherToolsAggs = {}
    sections.forEach(sectionId => {
        const bySurvey = []
        aggs.aggregations.surveys.buckets.map(survey => {
            const sectionAggs = survey[sectionId]
            if (sectionAggs === undefined || sectionAggs.buckets.length === 0) {
                return
            }
            bySurvey.push({
                survey_id: survey.key,
                tools: sectionAggs.buckets.map(b => ({
                    name: b.key,
                    count: b.doc_count,
                }))
            })
        })
        otherToolsAggs[sectionId] = bySurvey
    })

    return otherToolsAggs
}
