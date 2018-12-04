import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { salaryRanges, companySizes, yearsOfExperience } from '../../constants'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import Trans from 'core/i18n/Trans'
import OverviewBlock from './blocks/OverviewBlock'
import HappinessBlock from './blocks/HappinessBlock'
import ToolsSubAggsDistributionBlock from './blocks/ToolsSubAggsDistributionBlock'

const SectionIntroductionTemplate = ({ pageContext, data: { introduction, section }, ...rest }) => {
    return (
        <Layout pageContext={pageContext} {...rest}>
            <Trans>
                {translate => {
                    const sectionProperties = {
                        section: pageContext.section,
                        sectionName: translate(`section.${pageContext.section}`)
                    }

                    return (
                        <div className="template">
                            <PageHeader showIntro={true} introduction={introduction.html} />
                            <OverviewBlock
                                {...sectionProperties}
                                opinions={section.opinions}
                                chartId="overview"
                            />
                            <ToolsSubAggsDistributionBlock
                                {...sectionProperties}
                                aggsType="salary_range"
                                chartId="tools-salary-range"
                                keys={salaryRanges}
                                formatValue={v => `$${v}k`}
                                data={section.usage_users_info.by_salary}
                            />
                            <ToolsSubAggsDistributionBlock
                                {...sectionProperties}
                                aggsType="company_size"
                                chartId="tools-company-size"
                                keys={companySizes}
                                data={section.usage_users_info.by_company_size}
                            />
                            <ToolsSubAggsDistributionBlock
                                {...sectionProperties}
                                aggsType="years_of_experience"
                                chartId="tools-years-of-experience"
                                keys={yearsOfExperience}
                                formatValue={v => `${v}yrs`}
                                data={section.usage_users_info.by_years_of_experience}
                            />
                            <HappinessBlock
                                {...sectionProperties}
                                data={section.happiness}
                                chartId="happiness"
                            />
                        </div>
                    )
                }}
            </Trans>
        </Layout>
    )
}

SectionIntroductionTemplate.propTypes = {
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
    query sectionById($section: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
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

export default SectionIntroductionTemplate
