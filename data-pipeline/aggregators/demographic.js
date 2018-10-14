const elastic = require('../loaders/elastic')

const countryAndContinentSubAggs = {
    survey: {
        terms: {
            field: 'survey.keyword',
        },
        aggs: {
            salary: {
                terms: {
                    field: 'user_info.salary.keyword',
                }
            },
            company_size: {
                terms: {
                    field: 'user_info.company_size.keyword'
                }
            }
        }
    }
}

exports.byCountry = async () => {
    const aggs = await elastic.aggs({
        country: {
            terms: {
                size: 200,
                min_doc_count: 20,
                field: 'user_info.country.keyword',
            },
            aggs: countryAndContinentSubAggs
        }
    })

    return aggs.aggregations.country.buckets.filter(b => b.key !== 'undefined').map(country => ({
        country: country.key,
        count: country.doc_count,
        by_survey: country.survey.buckets.map(rawSurvey => ({
            survey: rawSurvey.key,
            count: rawSurvey.doc_count,
            salary: rawSurvey.salary.buckets.reduce((acc, salaryRange) => ({
                ...acc,
                [`salary_range_${salaryRange.key}`]: salaryRange.doc_count
            }), {}),
            company_size: rawSurvey.company_size.buckets.reduce((acc, companySize) => ({
                ...acc,
                [`company_size_${companySize.key}`]: companySize.doc_count
            }), {})
        }))
    }))
}

exports.byContinent = async () => {
    const aggs = await elastic.aggs({
        continent: {
            terms: {
                field: 'user_info.region.keyword',
            },
            aggs: countryAndContinentSubAggs
        }
    })

    return aggs.aggregations.continent.buckets.filter(b => b.key !== 'undefined').map(continent => ({
        continent: continent.key,
        count: continent.doc_count,
        by_survey: continent.survey.buckets.map(rawSurvey => ({
            survey: rawSurvey.key,
            count: rawSurvey.doc_count,
            salary: rawSurvey.salary.buckets.reduce((acc, salaryRange) => ({
                ...acc,
                [`salary_range_${salaryRange.key}`]: salaryRange.doc_count
            }), {}),
            company_size: rawSurvey.company_size.buckets.reduce((acc, companySize) => ({
                ...acc,
                [`company_size_${companySize.key}`]: companySize.doc_count
            }), {})
        }))
    }))
}
