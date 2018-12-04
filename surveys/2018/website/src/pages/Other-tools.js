import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import BarBlock from 'core/blocks/BarBlock'
import TextBlock from 'core/blocks/TextBlock'
import ResourcesBlock from 'core/blocks/ResourcesBlock'
import Trans from 'core/i18n/Trans'

const OtherTools = ({ data, ...rest }) => {
    const topics = data.topics.edges.map(({ node }) => node)

    return (
        <Layout {...rest}>
            <Trans>
                {translate => (
                    <div className="page">
                        <PageHeader />
                        <TextBlock text={data.introduction.html} />
                        {topics.map(topic => {
                            const data = topic.tools
                                .map(d => ({
                                    name: d.tool,
                                    count: d.count
                                }))
                                .reverse()

                            return (
                                <BarBlock
                                    key={topic.topic}
                                    data={data}
                                    title={translate(`other_tool.${topic.topic}`)}
                                    chartId={topic.topic}
                                    showDescription={false}
                                />
                            )
                        })}
                        <ResourcesBlock tool="editors" />
                    </div>
                )}
            </Trans>
        </Layout>
    )
}

export default OtherTools

export const query = graphql`
    query otherTools($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "other-tools" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        topics: allOtherToolsYaml {
            edges {
                node {
                    topic
                    tools {
                        tool
                        count
                    }
                }
            }
        }
    }
`
