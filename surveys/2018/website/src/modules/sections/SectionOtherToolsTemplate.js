import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import BarBlock from 'core/blocks/BarBlock'
import Trans from 'core/i18n/Trans'

const SectionOtherToolsTemplate = props => {
    const { data, pageContext, ...rest } = props
    const otherTools = [...data.section.other_tools].reverse()

    return (
        <Layout {...rest} pageContext={pageContext}>
            <Trans>
                {translate => (
                    <div className="template">
                        <PageHeader />
                        <BarBlock
                            chartId="other-tools"
                            values={{ sectionName: translate(`section.${pageContext.section}`) }}
                            data={otherTools}
                            showDescription={false}
                        />
                    </div>
                )}
            </Trans>
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

export default SectionOtherToolsTemplate
