import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const FeaturesTemplate = ({ data }) => {
    return <PageTemplate data={data} />
}

export default FeaturesTemplate

export const query = graphql`
    query featuresOverviewByLocale2($section: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: featuresUsageYaml(section_id: { eq: $section }) {
            aggregations {
                id
                total
                buckets {
                    id
                    count
                    percentage
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
