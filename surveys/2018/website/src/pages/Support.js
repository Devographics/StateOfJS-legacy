import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'

const Support = ({ data, ...rest }) => (
    <Layout {...rest}>
        <PageHeader showIntro={false} />
        <TextBlock text={data.content.html} />
    </Layout>
)

export default Support

export const query = graphql`
    query supportByLocale($locale: String!) {
        content: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "support_us" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
