const elastic = require('../loaders/elastic')

exports.participation = async (surveys, size = 20) => {
    const aggs = await elastic.aggs({
        survey: {
            terms: {
                field: `survey.keyword`,
                size,
            },
        },
    })

    return {
        total: aggs.hits.total,
        ...aggs.aggregations.survey.buckets.reduce((acc, bucket) => ({
            ...acc,
            [bucket.key]: bucket.doc_count,
        }), {})
    }
}

exports.participationByLocation = async (surveys, size = 64) => {
    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must_not: {
                        term: {
                            'hidden.location.keyword': 'undefined',
                        }
                    }
                }
            },
            aggs: {
                location: {
                    terms: {
                        field: 'hidden.location.keyword',
                        size,
                    },
                    aggs: {
                        survey: {
                            terms: {
                                field: 'survey.keyword',
                            },
                        },
                    },
                },
            },
        },
    })

    const locationsAggs = {}
    Object.keys(result.aggregations).forEach(location => {
        const locationAgg = result.aggregations[location]

        const all = locationAgg.buckets.reduce((acc, bucket) => ({
            ...acc,
            [bucket.key]: bucket.doc_count,
        }), {})

        const bySurvey = {}
        surveys.forEach(survey => {
            bySurvey[survey] = locationAgg.buckets.reduce((acc, bucket) => {
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

        locationsAggs[location] = {
            all,
            ...bySurvey,
        }
    }, {})

    return locationsAggs
}