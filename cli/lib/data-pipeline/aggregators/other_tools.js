const elastic = require('../loaders/elastic')

exports.otherToolsForSurvey = async surveyConfig => {
    const topics = surveyConfig.otherTools

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
        aggs: topics.reduce(
            (acc, topic) => ({
                ...acc,
                [topic]: {
                    terms: {
                        field: `other_tools.${topic}.keyword`,
                        size: 16,
                        min_doc_count: 30
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

    return topics.map(topic => ({
        topic,
        tools: result.aggregations[topic].buckets.map(bucket => ({
            tool: bucket.key,
            count: bucket.doc_count
        }))
    }))
}
