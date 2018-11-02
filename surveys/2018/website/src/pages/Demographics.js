import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
import GenderBreakdownBlock from '../components/blocks/GenderBreakdownBlock'
import { graphql } from 'gatsby'
import SectionHeader from '../components/elements/SectionHeader'
import ParticipationBreakdownBlock from '../components/blocks/ParticipationBreakdownBlock'
import SalaryPerCountryBlock from '../components/blocks/SalaryPerCountryBlock'

const text = `
Demographics intro TODO.
`

const Demographics = ({ data, ...rest }) => {
    return (
        <Layout {...rest}>
            <div>
                <SectionHeader />
                <TextBlock text={text} />
                <ParticipationBreakdownBlock />
                <GenderBreakdownBlock data={data.resultsYaml.demographics} />
                <SalaryPerCountryBlock />
            </div>
        </Layout>
    )
}

export default Demographics

export const query = graphql`
    query {
        resultsYaml(demographics: { by_continent: { elemMatch: { continent: { ne: null } } } }) {
            demographics {
                by_continent {
                    continent
                    by_survey {
                        survey
                        count
                        gender {
                            id
                            count
                        }
                        salary {
                            salary_range_work_for_free
                            salary_range_0_10
                            salary_range_30_50
                            salary_range_50_100
                            salary_range_100_200
                            salary_range_more_than_200
                        }
                        company_size {
                            company_size_1
                            company_size_1_5
                            company_size_5_10
                            company_size_10_20
                            company_size_20_50
                            company_size_50_100
                            company_size_100_1000
                            company_size_more_than_1000
                        }
                    }
                }
            }
        }
    }
`
