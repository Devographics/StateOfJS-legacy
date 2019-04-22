import React from 'react'
import { graphql } from 'gatsby'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'
import FeaturesScatterplotBlock from '../modules/features/blocks/FeaturesScatterplotBlock'
import { mergeFeaturesResources } from '../modules/features/featuresHelpers'

const FeaturesPage = ({ data }) => {
    const features = mergeFeaturesResources(
        data.features.aggregations,
        data.features.fields.resources
    )
    
    return (
    <>
        <PageHeader showIntro={false} />
        <TextBlock text="@todo intro" />
        <FeaturesScatterplotBlock id="features-overview" features={features}/>
        <TextBlock text="@todo top 20 most used features" />
        <TextBlock text="@todo top 20 least used features" />
    </>
)}

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
