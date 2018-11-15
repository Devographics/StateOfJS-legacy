import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import SectionHeader from '../elements/SectionHeader'
import BarBlock from '../blocks/BarBlock'

const OtherToolsTemplate = ({ data }) => {
    const otherTools = [...data.section.other_tools].reverse()

    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader />
                <BarBlock
                    chartId="other-tools"
                    description="Other tools mentioned by survey respondents, ranked by mention count."
                    data={otherTools}
                />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query sectionOtherTools($section: String!) {
        section: sectionsYaml(section_id: { eq: $section }) {
            section_id
            other_tools {
                name
                count
            }
        }
    }
`

export default OtherToolsTemplate
