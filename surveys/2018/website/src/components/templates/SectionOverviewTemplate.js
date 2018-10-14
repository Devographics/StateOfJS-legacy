import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import SectionOpinionsBlock from '../blocks/SectionOpinionsBlock'
import HappinessBlock from '../blocks/HappinessBlock'
import { graphql } from 'gatsby'

const SectionOverviewTemplate = ({ pageContext, data }) => {
    const section = data.sectionsYaml
    const hasEntry = section !== null

    return (
        <Layout>
            <div className="template">
                <Meta />
                {!hasEntry && (
                    <div style={{ color: 'red' }}>
                        No entry found for section: <strong>{pageContext.section}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {hasEntry && <SectionOpinionsBlock opinions={section.opinions} />}
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
                    would_use
                    would_not_use
                    interested
                    not_interested
                    never_heard
                }
            }
        }
    }
`

export default SectionOverviewTemplate
