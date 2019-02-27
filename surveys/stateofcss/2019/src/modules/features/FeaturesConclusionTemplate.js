import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import PageHeader from 'core/pages/PageHeader'

const FeaturesConclusionTemplate = ({ data }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    console.log(data.conclusion)

    return (
        <>
            <PageHeader
                title={translate('page.features_conclusion', {
                    values: { section: translate(`features.${context.section}`) }
                })}
                introduction={
                    data.conclusion !== null
                        ? data.conclusion.html
                        : `[missing] ${context.section} conclusion.`
                }
            />
        </>
    )
}

export default FeaturesConclusionTemplate

export const query = graphql`
    query featuresConclusionByLocale($section: String!, $locale: String!) {
        conclusion: markdownRemark(
            frontmatter: {
                type: { eq: "conclusion" }
                page: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
