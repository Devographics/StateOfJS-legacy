const config = require('@ekino/config')
const elastic = require('../loaders/elastic')

exports.salary = async () => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        salary: {
            terms: {
                field: 'user_info.salary.keyword'
            },
            aggs: {
                survey: {
                    terms: {
                        field: 'survey.keyword'
                    }
                }
            }
        }
    })

    const aggs = { all: {} }
    result.aggregations.salary.buckets.forEach(bucket => {
        aggs.all[bucket.key] = bucket.doc_count
        bucket.survey.buckets.forEach(subBucket => {
            if (aggs[subBucket.key] === undefined) {
                aggs[subBucket.key] = {}
            }
            aggs[subBucket.key][bucket.key] = subBucket.doc_count
        })
    })

    return aggs
}

exports.yearsOfExperience = async () => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        years_of_experience: {
            terms: {
                field: 'user_info.years_of_experience.keyword'
            },
            aggs: {
                survey: {
                    terms: {
                        field: 'survey.keyword'
                    }
                }
            }
        }
    })

    const aggs = { all: {} }
    result.aggregations.years_of_experience.buckets.forEach(bucket => {
        aggs.all[bucket.key] = bucket.doc_count
        bucket.survey.buckets.forEach(subBucket => {
            if (aggs[subBucket.key] === undefined) {
                aggs[subBucket.key] = {}
            }
            aggs[subBucket.key][bucket.key] = subBucket.doc_count
        })
    })

    return aggs
}

exports.companySize = async () => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        company_size: {
            terms: {
                field: 'user_info.company_size.keyword'
            },
            aggs: {
                survey: {
                    terms: {
                        field: 'survey.keyword'
                    }
                }
            }
        }
    })

    const aggs = { all: {} }
    result.aggregations.company_size.buckets.forEach(bucket => {
        aggs.all[bucket.key] = bucket.doc_count
        bucket.survey.buckets.forEach(subBucket => {
            if (aggs[subBucket.key] === undefined) {
                aggs[subBucket.key] = {}
            }
            aggs[subBucket.key][bucket.key] = subBucket.doc_count
        })
    })

    return aggs
}
