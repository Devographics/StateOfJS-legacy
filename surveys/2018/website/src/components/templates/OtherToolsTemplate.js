import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import SectionHeader from '../elements/SectionHeader'
import BarBlock from '../blocks/BarBlock'

const OtherToolsTemplate = ({ data }) => {
    const otherTools = data.sectionsYaml.other_tools
        .find(ot => ot.survey_id === '2018')
        .tools.reverse()

    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader />
                <BarBlock
                    chart="other-tools"
                    description="Other tools mentioned by survey respondents, ranked by mention count."
                    data={otherTools}
                />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query sectionOtherTools($section: String!) {
        sectionsYaml(section_id: { eq: $section }) {
            section_id
            other_tools {
                survey_id
                tools {
                    name
                    count
                }
            }
        }
    }
`

export default OtherToolsTemplate
