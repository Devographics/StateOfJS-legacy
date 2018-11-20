const config = require('@ekino/config')
const elastic = require('../loaders/elastic')
const constants = require('../../../conf/constants')

exports.salaryAndCompanySizeAndYearsOfExperienceByLocationForSurvey = async (
    locationType,
    survey
) => {
    const result = await elastic.search(config.get('elastic.indices.norm'), {
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
                location: {
                    terms: {
                        size: 200,
                        min_doc_count: 20,
                        field: `user_info.${locationType}.keyword`
                    },
                    aggs: {
                        salary: {
                            terms: {
                                field: 'user_info.salary.keyword'
                            }
                        },
                        company_size: {
                            terms: {
                                field: 'user_info.company_size.keyword'
                            }
                        },
                        years_of_experience: {
                            terms: {
                                field: 'user_info.years_of_experience.keyword'
                            }
                        }
                    }
                }
            }
        }
    })

    return result.aggregations.location.buckets
        .filter(b => b.key !== 'undefined')
        .map(locationBucket => {
            const total = locationBucket.doc_count
            const salaryTotal = locationBucket.salary.buckets.reduce((t, bucket) => {
                return t + constants.salaryRangeAverages[bucket.key] * bucket.doc_count
            }, 0)

            return {
                [locationType]: locationBucket.key,
                total,
                salary: {
                    average: Number((salaryTotal / total).toFixed(1)),
                    ranges: locationBucket.salary.buckets.map(bucket => ({
                        range: bucket.key.replace(/_/g, '-'),
                        count: bucket.doc_count,
                        percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                    }))
                }
            }
        })
}

exports.participationByLocation = async locationType => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        by_survey: {
            terms: {
                field: 'survey.keyword'
            },
            aggs: {
                location: {
                    terms: {
                        field: `user_info.${locationType}.keyword`,
                        size: 200
                    }
                }
            }
        }
    })

    return result.aggregations.by_survey.buckets.map(surveyBucket => {
        const total = surveyBucket.doc_count

        return {
            survey: surveyBucket.key,
            total,
            by_country: surveyBucket.location.buckets.map(locationBucket => {
                return {
                    country: locationBucket.key,
                    count: locationBucket.doc_count,
                    percentage: Number(((locationBucket.doc_count / total) * 100).toFixed(2))
                }
            })
        }
    })
}
exports.participationByContinent = async () => exports.participationByLocation('continent')
exports.participationByCountry = async () => exports.participationByLocation('country')

exports.genderBreakdown = async () => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        by_survey: {
            terms: {
                field: 'survey.keyword'
            },
            aggs: {
                gender: {
                    terms: {
                        field: 'user_info.gender.keyword'
                    }
                }
            }
        }
    })

    return result.aggregations.by_survey.buckets.map(surveyBucket => {
        const total = surveyBucket.doc_count

        return {
            survey: surveyBucket.key,
            total,
            by_gender: surveyBucket.gender.buckets.map(genderBucket => {
                return {
                    gender: genderBucket.key,
                    count: genderBucket.doc_count,
                    percentage: Number(((genderBucket.doc_count / total) * 100).toFixed(2))
                }
            })
        }
    })
}

/**
 * A generic function used to aggregate user info by survey.
 * Currently supporting:
 * - salary
 * - years_of_experience
 * - company_size
 */
exports.userInfoAggs = async (aggType, averages) => {
    const result = await elastic.aggs(config.get('elastic.indices.norm'), {
        by_survey: {
            terms: {
                field: 'survey.keyword'
            },
            aggs: {
                [aggType]: {
                    terms: {
                        field: `user_info.${aggType}.keyword`
                    }
                }
            }
        }
    })

    return result.aggregations.by_survey.buckets.map(surveyBucket => {
        const total = surveyBucket.doc_count
        const salaryTotal = surveyBucket[aggType].buckets.reduce((t, bucket) => {
            return t + averages[bucket.key] * bucket.doc_count
        }, 0)

        return {
            survey: surveyBucket.key,
            total,
            average: Number((salaryTotal / total).toFixed(1)),
            ranges: surveyBucket[aggType].buckets.map(bucket => ({
                range: bucket.key.replace(/_/g, '-'),
                count: bucket.doc_count,
                percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
            }))
        }
    })
}

exports.salary = async () => exports.userInfoAggs('salary', constants.salaryRangeAverages)
exports.yearsOfExperience = async () =>
    exports.userInfoAggs('years_of_experience', constants.yearsOfExperienceAverages)
exports.companySize = async () =>
    exports.userInfoAggs('company_size', constants.companySizeAverages)
