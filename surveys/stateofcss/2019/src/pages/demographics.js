import React from 'react'
import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

const DemographicsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default DemographicsPage

DemographicsPage.propTypes = {
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
            ).isRequired,
            years_of_experience: PropTypes.arrayOf(
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
            ).isRequired,
            company_size: PropTypes.arrayOf(
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

export const query = graphql`
    query demographics($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "demographics" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
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
            years_of_experience {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
            company_size {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
            source {
                survey
                total
                by_source {
                    source
                    count
                    percentage
                }
            }
        }
    }
`
