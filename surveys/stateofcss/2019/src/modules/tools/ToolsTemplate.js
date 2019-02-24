import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'

const ToolsTemplate = ({ pageContext, data, ...rest }) => {
    console.log(pageContext, data, rest)
    return (
        <Layout {...rest} pageContext={pageContext}>
            <PageHeader />
            {/*
            <TextBlock text={data.introduction.html} />
            */}
            {pageContext.blocks.map(block => {
                return (
                    <div>{block.id}</div>
                )
            })}
        </Layout>
    )
}

export default ToolsTemplate

export const query = graphql`
    query toolsByLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
