import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const FeaturesPage = ({ data }) => {
    // const features = mergeFeaturesResources(
    //     data.features.aggregations,
    //     data.features.fields.resources
    // )
    return <PageTemplate data={data} />
}

export default FeaturesPage

// TODO: change query so that it gets all features, and not just those for a specific section
export const query = graphql`
    query featuresOverviewByLocale3($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "layout" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: featuresUsageYaml(section_id: { eq: "layout" }) {
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
