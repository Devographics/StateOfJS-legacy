'use strict'

const config = require('@ekino/config')
const elastic = require('../elastic')
const helpers = require('./helpers')

const salaryAverages = {
    'I work for free :(': 0,
    '$0-$10k': 5,
    '$10-$30k': 20,
    '$30-50k': 40,
    '$50-$100k': 75,
    '$100k-$200k': 150,
    '$200k+': 250
}

const yearsOfExperienceAverages = {
    'Less than one year': 0.5,
    '1-2 years': 1.5,
    '2-5 years': 3.5,
    '5-10 years': 7.5,
    '10-20 years': 15,
    '20+ years': 22.5
}

module.exports = async (fields, experience = `I've USED it before, and WOULD use it again`) => {
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
                        by_experience: { terms: { field: 'Years of Experience' } }
                    }
                }

                return aggs
            }, {})
        }
    })

    const all = await elastic.client.search({
        index: config.get('elastic.index'),
        size: 0,
        body: {
            query: {
                bool: {
                    should: fields.map(field => ({
                        term: { [field]: experience }
                    }))
                }
            },
            aggs: {
                by_salary: { terms: { field: 'Yearly Salary' } },
                by_experience: { terms: { field: 'Years of Experience' } }
            }
        }
    })

    result.aggregations.Aggregated = Object.assign({}, all.aggregations, {
        doc_count: all.hits.total
    })

    const allFields = ['Aggregated', ...fields]
    allFields.forEach(field => {
        const total = result.aggregations[field].doc_count

        let salaryBuckets = result.aggregations[field].by_salary.buckets

        // compute percentages
        salaryBuckets = salaryBuckets.map(bucket =>
            Object.assign({}, bucket, {
                percentage: Math.round((bucket.doc_count / total) * 100)
            })
        )
        helpers.fixBucketsPercentages(salaryBuckets)
        result.aggregations[field].by_salary.buckets = salaryBuckets

        // compute average salary for given tool
        const totalSalary = salaryBuckets.reduce((t, bucket) => {
            const rangeAverage = salaryAverages[bucket.key]
            const numberOfUsersInRange = bucket.doc_count

            return t + rangeAverage * numberOfUsersInRange
        }, 0)
        result.aggregations[field].by_salary.average = Math.round(totalSalary / total)

        let yearsOfExperienceBuckets = result.aggregations[field].by_experience.buckets

        // compute percentages
        yearsOfExperienceBuckets = yearsOfExperienceBuckets.map(bucket =>
            Object.assign({}, bucket, {
                percentage: Math.round((bucket.doc_count / total) * 100)
            })
        )
        helpers.fixBucketsPercentages(yearsOfExperienceBuckets)
        result.aggregations[field].by_experience.buckets = yearsOfExperienceBuckets

        // compute average years of XP for given years of XP
        const totalYearsOfExperience = yearsOfExperienceBuckets.reduce((t, bucket) => {
            const rangeAverage = yearsOfExperienceAverages[bucket.key]
            const numberOfUsersInRange = bucket.doc_count

            return t + rangeAverage * numberOfUsersInRange
        }, 0)
        result.aggregations[field].by_experience.average = Math.round(
            totalYearsOfExperience / total
        )
    })

    return result.aggregations
}
