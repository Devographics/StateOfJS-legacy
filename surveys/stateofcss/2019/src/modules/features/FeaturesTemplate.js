import React from 'react'
import { graphql } from 'gatsby'
// import { PageContext } from 'core/pages/pageContext'
// import { I18nContext } from 'core/i18n/i18nContext'
import PageTemplate from 'core/pages/PageTemplate'
// import FeaturesOverviewBlock from './blocks/FeaturesOverviewBlock'
// import { mergeFeaturesResources } from './featuresHelpers'
// import FeatureBlock from './blocks/FeatureBlock'
// import FeaturesScatterplotBlock from './blocks/FeaturesScatterplotBlock'

const FeaturesTemplate = ({ data }) => {
    // const context = useContext(PageContext)
    // const { translate } = useContext(I18nContext)

    // const features = mergeFeaturesResources(
    //     data.features.aggregations,
    //     data.features.fields.resources
    // )

    return <PageTemplate data={data} />
    // return (
    //     <>
    //         <PageHeader
    //             title={translate(`page.${context.section}`)}
    //             introduction={
    //                 data.introduction !== null
    //                     ? data.introduction.html
    //                     : `[missing] ${context.section} introduction.`
    //             }
    //         />
    //         <FeaturesScatterplotBlock id="features-overview" features={features} />

    //         {/* <FeaturesOverviewBlock features={features} /> */}

    //         {context.blocks.map(block => {
    //             const feature = features.find(a => a.id === block.id)
    //             return feature && <FeatureBlock key={block.id} block={block} feature={feature} />
    //         })}

    //     </>
    // )
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
        features: featuresUsageYaml(section_id: { eq: $section }) {
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
