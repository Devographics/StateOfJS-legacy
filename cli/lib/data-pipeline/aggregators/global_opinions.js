const config = require('@ekino/config')
const elastic = require('../loaders/elastic')
const { globalOpinionsSubjectNormalizers } = require('../../../conf/normalize')

const subjects = Object.values(globalOpinionsSubjectNormalizers)

exports.globalOpinions = async () => {
    const result = await elastic.aggs(
        config.get('elastic.indices.norm'),
        subjects.reduce(
            (acc, subject) => ({
                ...acc,
                [subject]: {
                    terms: {
                        field: 'survey.keyword',
                        order: { _key: 'asc' }
                    },
                    aggs: {
                        choices: {
                            terms: {
                                field: `global_opinions.${subject}`,
                                order: { _key: 'asc' }
                            }
                        }
                    }
                }
            }),
            {}
        )
    )

    return subjects.map(subject => {
        return {
            subject,
            by_survey: result.aggregations[subject].buckets.map(surveyBucket => {
                const total = surveyBucket.doc_count

                return {
                    survey: surveyBucket.key,
                    total,
                    by_choice: surveyBucket.choices.buckets.map(bucket => ({
                        choice: bucket.key,
                        count: bucket.doc_count,
                        percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                    }))
                }
            })
        }
    })
}
