import React from 'react'
import { graphql } from 'gatsby'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'

const Support = ({ data }) => (
    <>
        <PageHeader showIntro={false} />
        {data.content && data.content.html && <TextBlock text={data.content.html} />}
    </>
)

export default Support

export const query = graphql`
    query supportByLocale($locale: String!) {
        content: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "support" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
