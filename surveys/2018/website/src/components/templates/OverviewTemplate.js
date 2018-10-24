import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import OverviewBlock from '../blocks/OverviewBlock'
import HappinessBlock from '../blocks/HappinessBlock'
import { graphql } from 'gatsby'
import SectionHeader from '../elements/SectionHeader'

const OverviewTemplate = ({ pageContext, data }) => {
    const section = data.sectionsYaml
    const hasEntry = section !== null

    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader showIntro={true} />
                {!hasEntry && (
                    <div style={{ color: 'red' }}>
                        No entry found for section: <strong>{pageContext.section}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {hasEntry && (
                    <OverviewBlock
                        section={pageContext.section}
                        opinions={section.opinions}
                    />
                )}
                <HappinessBlock section="section" value={2} />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query sectionById($section: String!) {
        sectionsYaml(section_id: { eq: $section }) {
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
        }
    }
`

export default OverviewTemplate
