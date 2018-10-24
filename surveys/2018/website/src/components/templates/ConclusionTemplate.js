import { graphql } from 'gatsby'
import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'
import QuadrantBlock from '../blocks/QuadrantBlock'
import SectionHeader from '../elements/SectionHeader'

const ConclusionTemplate = ({ pageContext, data }) => {
    const content = data.file.childMarkdownRemark ? data.file.childMarkdownRemark.html : undefined
    const opinions = data.opinions.opinions.find(o => o.survey_id === '2018')

    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader />
                <QuadrantBlock tools={opinions.tools} />
                {content === undefined && (
                    <div style={{ color: 'red' }}>
                        No conclusion found for section: <strong>{pageContext.name}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {content !== undefined && <TextBlock text={content} />}
            </div>
        </Layout>
    )
}

export default ConclusionTemplate

export const query = graphql`
    query($name: String, $section: String) {
        file(name: { eq: $name }) {
            childMarkdownRemark {
                html
            }
        }
        opinions: sectionsYaml(section_id: { eq: $section }) {
            opinions {
                survey_id
                tools {
                    tool_id
                    counts {
                        would_use
                        would_not_use
                        interested
                        not_interested
                        never_heard
                    }
                }
            }
        }
    }
`
