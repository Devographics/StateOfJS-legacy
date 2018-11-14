import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import OverviewBlock from '../blocks/OverviewBlock'
import HappinessBlock from '../blocks/HappinessBlock'
import SectionHeader from '../elements/SectionHeader'

const OverviewTemplate = ({ pageContext, data: { section } }) => {
    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader showIntro={true} />
                <OverviewBlock section={pageContext.section} opinions={section.opinions} />
                <HappinessBlock section="section" data={section.happiness} />
            </div>
        </Layout>
    )
}

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
            ).isRequired
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
        }
    }
`

export default OverviewTemplate
