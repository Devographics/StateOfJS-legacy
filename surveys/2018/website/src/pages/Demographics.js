import React from 'react'
import PropTypes from 'prop-types'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
import GenderBreakdownBlock from '../components/blocks/GenderBreakdownBlock'
import { graphql } from 'gatsby'
import SectionHeader from '../components/elements/SectionHeader'
import ParticipationByCountryBlock from '../components/blocks/ParticipationByCountryBlock'
import SalariesBlock from '../components/blocks/SalariesBlock'
import SalaryPerCountryBlock from '../components/blocks/SalaryPerCountryBlock'

const Demographics = ({ data, ...rest }) => {
    const participationData = data.stats.participation.find(s => s.survey === '2018').by_country
    const genderData = data.stats.gender.find(s => s.survey === '2018')

    return (
        <Layout {...rest}>
            <div>
                <SectionHeader />
                <TextBlock text={data.file.childMarkdownRemark.html} />
                <ParticipationByCountryBlock data={participationData} chartId="participation-by-country" />
                <SalariesBlock data={data.stats.salary} chartId="salaries"/>
                <SalaryPerCountryBlock data={data.stats.by_country} chartId="salary-per-country"/>
                <GenderBreakdownBlock data={genderData} chartId="gender-breakdown"/>
            </div>
        </Layout>
    )
}

Demographics.propTypes = {
    data: PropTypes.shape({
        stats: PropTypes.shape({
            participation: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    by_country: PropTypes.arrayOf(
                        PropTypes.shape({
                            country: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            gender: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    by_gender: PropTypes.arrayOf(
                        PropTypes.shape({
                            gender: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            by_country: PropTypes.arrayOf(
                PropTypes.shape({
                    country: PropTypes.string.isRequired,
                    salary: PropTypes.shape({
                        average: PropTypes.number.isRequired
                    }).isRequired
                })
            ).isRequired,
            salary: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    average: PropTypes.number.isRequired,
                    ranges: PropTypes.arrayOf(
                        PropTypes.shape({
                            range: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default Demographics

export const query = graphql`
    query {
        stats: demographicsYaml {
            participation {
                survey
                total
                by_country {
                    country
                    count
                    percentage
                }
            }
            gender {
                survey
                total
                by_gender {
                    gender
                    count
                    percentage
                }
            }
            by_country {
                country
                total
                salary {
                    average
                }
            }
            salary {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
        }
        file(name: { eq: "demographics-introduction" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
