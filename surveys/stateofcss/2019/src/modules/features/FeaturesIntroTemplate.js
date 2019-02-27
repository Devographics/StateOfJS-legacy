import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import PageHeader from 'core/pages/PageHeader'
import FeaturesOverviewBlock from './blocks/FeaturesOverviewBlock'
import { mergeFeaturesResources } from './featuresHelpers'

const FeaturesIntroTemplate = ({ data }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const features = mergeFeaturesResources(data.features.aggregations, data.features.fields.resources)

    return (
        <>
            <PageHeader
                title={translate('page.features_intro', {
                    values: { section: translate(`features.${context.section}`) }
                })}
                introduction={
                    data.introduction !== null
                        ? data.introduction.html
                        : `[missing] ${context.section} introduction.`
                }
            />
            <FeaturesOverviewBlock features={features}/>
        </>
    )
}

export default FeaturesIntroTemplate

export const query = graphql`
    query featuresOverviewByLocale($section: String!, $locale: String!) {
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
