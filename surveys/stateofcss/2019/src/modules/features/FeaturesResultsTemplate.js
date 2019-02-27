import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import PageHeader from 'core/pages/PageHeader'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import FeatureBlock from './blocks/FeatureBlock'
import { mergeFeaturesResources } from './featuresHelpers'

const FeaturesResultsTemplate = ({ data }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const features = mergeFeaturesResources(data.features.aggregations, data.features.fields.resources)

    return (
        <>
            <PageHeader
                title={translate('page.features_results', {
                    values: { section: translate(`features.${context.section}`) }
                })}
            />
            {context.blocks.map(block => {
                const feature = features.find(a => a.id === block.id)

                return (
                    <FeatureBlock
                        key={block.id}
                        block={block}
                        feature={feature}
                    />
                )
            })}
        </>
    )
}

export default FeaturesResultsTemplate

export const query = graphql`
    query featuresResultsByLocale($section: String!, $locale: String!) {
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
