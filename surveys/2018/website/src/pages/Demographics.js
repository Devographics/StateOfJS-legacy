import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
// import GenderBreakdownBlock from '../components/blocks/GenderBreakdownBlock'
import { graphql } from 'gatsby'
import SectionHeader from '../components/elements/SectionHeader'
import ParticipationByCountryBlock from '../components/blocks/ParticipationByCountryBlock'
import SalaryPerCountryBlock from '../components/blocks/SalaryPerCountryBlock'

const text = `
Demographics intro TODO.
`

const Demographics = ({ data, ...rest }) => {
    const participationData = data.demographicsYaml.participation.find(s => s.survey === '2018')
        .by_country

    return (
        <Layout {...rest}>
            <div>
                <SectionHeader />
                <TextBlock text={text} />
                <ParticipationByCountryBlock data={participationData} />
                {/*<GenderBreakdownBlock data={data.resultsYaml.demographics} />*/}
                <SalaryPerCountryBlock />
            </div>
        </Layout>
    )
}

export default Demographics

export const query = graphql`
    query {
        demographicsYaml {
            participation {
                survey
                total
                by_country {
                    country
                    count
                    percentage
                }
            }
        }
    }
`
