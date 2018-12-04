import { graphql } from 'gatsby'
import React from 'react'
import Layout from 'core/Layout'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import Trans from 'core/i18n/Trans'
import QuadrantBlock from './blocks/QuadrantBlock'

const SectionConclusionTemplate = ({ pageContext, data, ...rest }) => {
    const content = data.conclusion ? data.conclusion.html : undefined
    const opinions = data.opinions.opinions.find(o => o.survey_id === '2018')

    return (
        <Layout pageContext={pageContext} {...rest}>
            <Trans>
                {translate => (
                    <div className="template">
                        <PageHeader />
                        <QuadrantBlock
                            tools={opinions.tools}
                            chartId="quadrants"
                            values={{ sectionName: translate(`section.${pageContext.section}`) }}
                        />
                        {content !== undefined && (
                            <TextBlock title={translate('conclusion')} text={content} />
                        )}
                    </div>
                )}
            </Trans>
        </Layout>
    )
}

export default SectionConclusionTemplate

export const query = graphql`
    query($section: String, $locale: String) {
        conclusion: markdownRemark(
            frontmatter: {
                type: { eq: "conclusion" }
                section: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
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
