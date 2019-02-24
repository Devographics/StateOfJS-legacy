import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import TextBlock from 'core/blocks/TextBlock'
import FeatureUsageBlock from './blocks/FeatureUsageBlock'

const FeatureUsageTemplate = ({ pageContext, data, ...rest }) => {
    console.log(pageContext, data, rest)

    return (
        <Layout {...rest} pageContext={pageContext}>
            <PageHeader />
            <TextBlock text={data.introduction.html} />
            {pageContext.blocks.map(block => {
                const blockData = data.aggs.aggregations.find(a => a.id === block.id)
                const blockResources = data.aggs.fields.resources.find(r => r.id === block.id)

                return (
                    <FeatureUsageBlock
                        key={block.id}
                        block={block}
                        buckets={blockData.buckets}
                        resources={blockResources}
                    />
                )
            })}
        </Layout>
    )
}

export default FeatureUsageTemplate

export const query = graphql`
    query featureUsageByLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        aggs: featuresUsageYaml(section_id: { eq: $id }) {
            aggregations {
                id
                total
                buckets {
                    id
                    count
                }
            }
            fields {
                resources {
                    id
                    mdn {
                        locale
                        url
                        title
                        summary
                    }
                    caniuse {
                        title
                        spec
                        links {
                            title
                            url
                        }
                        stats {
                            browser
                            by_version {
                                version
                                support
                            }
                        }
                    }
                }
            }
        }
    }
`
