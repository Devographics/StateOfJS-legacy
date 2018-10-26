import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'
import SectionHeader from '../elements/SectionHeader'
import OthersBarsBlock from '../blocks/OthersBarsBlock'

const OtherToolsTemplate = ({ data }) => {
    const otherTools = data.sectionsYaml.other_tools.find(ot => ot.survey_id === '2018').tools
    console.log(otherTools)

    return (
        <Layout>
            <div className="template">
                <Meta />
                <SectionHeader />
                <OthersBarsBlock others={otherTools} baseKeys={otherTools.map(({ name }) => name)} />
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
