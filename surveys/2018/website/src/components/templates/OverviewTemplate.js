import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { salaryRanges, companySizes, yearsOfExperience } from '../../constants'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import OverviewBlock from '../blocks/OverviewBlock'
import HappinessBlock from '../blocks/HappinessBlock'
import SectionHeader from '../elements/SectionHeader'
import ToolsSubAggsDistributionBlock from '../blocks/ToolsSubAggsDistributionBlock'

const OverviewTemplate = ({ pageContext, data: { section } }) => (
    <Layout>
        <div className="template">
            <Meta />
            <SectionHeader showIntro={true} />
            <OverviewBlock section={pageContext.section} opinions={section.opinions} />
            <HappinessBlock section="section" data={section.happiness} />
            <ToolsSubAggsDistributionBlock
                section={pageContext.section}
                aggsType="salary_range"
                keys={salaryRanges}
                formatValue={v => `$${v}k`}
                data={section.usage_users_info.by_salary}
            />
            <ToolsSubAggsDistributionBlock
                section={pageContext.section}
                aggsType="company_size"
                keys={companySizes}
                data={section.usage_users_info.by_company_size}
            />
            <ToolsSubAggsDistributionBlock
                section={pageContext.section}
                aggsType="years_of_experience"
                keys={yearsOfExperience}
                formatValue={v => `${v}yrs`}
                data={section.usage_users_info.by_years_of_experience}
            />
        </div>
    </Layout>
)

OverviewTemplate.propTypes = {
    data: PropTypes.shape({
        section: PropTypes.shape({
            section_id: PropTypes.string.isRequired,
            happiness: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    average: PropTypes.number.isRequired,
                    scores: PropTypes.arrayOf(
                        PropTypes.shape({
                            score: PropTypes.number.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            usage_users_info: PropTypes.shape({
                by_salary: PropTypes.arrayOf(
                    PropTypes.shape({
                        tool: PropTypes.string.isRequired,
                        total: PropTypes.number.isRequired,
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
                by_company_size: PropTypes.arrayOf(
                    PropTypes.shape({
                        tool: PropTypes.string.isRequired,
                        total: PropTypes.number.isRequired,
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
                by_years_of_experience: PropTypes.arrayOf(
                    PropTypes.shape({
                        tool: PropTypes.string.isRequired,
                        total: PropTypes.number.isRequired,
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
    }).isRequired
}

export const query = graphql`
    query sectionById($section: String!) {
        section: sectionsYaml(section_id: { eq: $section }) {
            section_id
            opinions {
                survey_id
                tools {
                    tool_id
                    counts {
                        would_not_use
                        not_interested
                        would_use
                        interested
                        never_heard
                    }
                    percentages {
                        would_not_use
                        not_interested
                        would_use
                        interested
                        never_heard
                    }
                }
            }
            happiness {
                survey
                average
                scores {
                    score
                    count
                    percentage
                }
            }
            usage_users_info {
                by_salary {
                    tool
                    total
                    average
                    ranges {
                        range
                        count
                        percentage
                    }
                }
                by_company_size {
                    tool
                    total
                    average
                    ranges {
                        range
                        count
                        percentage
                    }
                }
                by_years_of_experience {
                    tool
                    total
                    average
                    ranges {
                        range
                        count
                        percentage
                    }
                }
            }
        }
    }
`

export default OverviewTemplate
