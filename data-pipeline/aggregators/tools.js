const elastic = require('../loaders/elastic')
const personalInfo = require('../conf/user_info')
const util = require('./util')

exports.experiences = async (tools, surveys, config) => {
    const result = await elastic.aggs(tools.reduce((acc, tool) => ({
        ...acc,
        [tool]: {
            terms: {
                field: `tools.${tool}.keyword`,
                size: tools.length,
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

    const toolsAggs = {}
    Object.keys(result.aggregations).forEach(tool => {
        const toolAgg = result.aggregations[tool]

        const all = toolAgg.buckets.reduce((acc, bucket) => ({
            ...acc,
            [bucket.key]: bucket.doc_count,
        }), {})

        const bySurvey = {}
        const appearsInSurveys = surveys.filter(s => config[s].tools.includes(tool))
        appearsInSurveys.forEach(survey => {
            bySurvey[survey] = toolAgg.buckets.reduce((acc, bucket) => {
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

        toolsAggs[tool] = {
            surveys: appearsInSurveys,
            all,
            ...bySurvey,
        }
    }, {})

    return toolsAggs
}

exports.experience = async (tools, surveys, config, experienceId) => {
    const result = await elastic.aggs(tools.reduce((acc, tool) => ({
        ...acc,
        [tool]: {
            filter: {
                term: {
                    [`tools.${tool}.keyword`]: experienceId,
                }
            },
            aggs: {
                years_of_experience: {
                    terms: {
                        field: 'user_info.years_of_experience.keyword',
                    },
                    aggs: {
                        survey: {
                            terms: {
                                field: 'survey.keyword',
                            },
                        },
                    },
                },
                company_size: {
                    terms: {
                        field: 'user_info.company_size.keyword',
                    },
                    aggs: {
                        survey: {
                            terms: {
                                field: 'survey.keyword',
                            },
                        },
                    },
                },
                salary: {
                    terms: {
                        field: 'user_info.salary.keyword',
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
    }), {}))

    const yearsOfExperienceRanges = personalInfo.yearsOfExperienceRanges.map(({ id }) => id)
    const companySizeRanges = personalInfo.companySizes.map(({ id }) => id)
    const salaryRanges = personalInfo.salaryRanges.map(({ id }) => id)

    const aggs = {}
    tools.forEach(tool => {
        const toolAggs = result.aggregations[tool]
        const total = toolAggs.doc_count

        const byYearsOfExperience = { all: {} }
        yearsOfExperienceRanges.forEach(yearsOfExperienceRange => {
            const bucket = toolAggs.years_of_experience.buckets.find(b => b.key === yearsOfExperienceRange)
            byYearsOfExperience.all[yearsOfExperienceRange] = bucket.doc_count
        })
        byYearsOfExperience.all = util.computePercentageForKeys(byYearsOfExperience.all, yearsOfExperienceRanges)

        const byCompanySize = { all: {} }
        companySizeRanges.forEach(companySizeRange => {
            const bucket = toolAggs.company_size.buckets.find(b => b.key === companySizeRange)
            byCompanySize.all[companySizeRange] = bucket.doc_count
        })
        byCompanySize.all = util.computePercentageForKeys(byCompanySize.all, companySizeRanges)

        const bySalary = { all: {} }
        salaryRanges.forEach(salaryRange => {
            const bucket = toolAggs.salary.buckets.find(b => b.key === salaryRange)
            bySalary.all[salaryRange] = bucket.doc_count
        })
        bySalary.all = util.computePercentageForKeys(bySalary.all, salaryRanges)

        const appearsInSurveys = surveys.filter(s => config[s].tools.includes(tool))
        appearsInSurveys.forEach(survey => {
            const yearsOfExperienceAgg = {}
            yearsOfExperienceRanges.forEach(yearsOfExperienceRange => {
                const bucket = toolAggs.years_of_experience.buckets.find(b => b.key === yearsOfExperienceRange)
                const surveyBucket = bucket.survey.buckets.find(b => b.key === survey)
                yearsOfExperienceAgg[yearsOfExperienceRange] = surveyBucket === undefined ? 0 : surveyBucket.doc_count
            })
            byYearsOfExperience[survey] = util.computePercentageForKeys(yearsOfExperienceAgg, yearsOfExperienceRanges)

            const companySizeAgg = {}
            companySizeRanges.forEach(companySizeRange => {
                const bucket = toolAggs.company_size.buckets.find(b => b.key === companySizeRange)
                const surveyBucket = bucket.survey.buckets.find(b => b.key === survey)
                companySizeAgg[companySizeRange] = surveyBucket === undefined ? 0 : surveyBucket.doc_count
            })
            byCompanySize[survey] = util.computePercentageForKeys(companySizeAgg, companySizeRanges)

            const salaryAgg = {}
            salaryRanges.forEach(salaryRange => {
                const bucket = toolAggs.salary.buckets.find(b => b.key === salaryRange)
                const surveyBucket = bucket.survey.buckets.find(b => b.key === survey)
                salaryAgg[salaryRange] = surveyBucket === undefined ? 0 : surveyBucket.doc_count
            })
            bySalary[survey] = util.computePercentageForKeys(salaryAgg, salaryRanges)
        })

        aggs[tool] = {
            total,
            by_years_of_experience: byYearsOfExperience,
            by_company_size: byCompanySize,
            by_salary: bySalary,
        }
    })

    return aggs
}
