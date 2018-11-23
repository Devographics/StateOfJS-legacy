import React from 'react'
import { graphql } from 'gatsby'
import AwardsBlock from 'modules/awards/AwardsBlock'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'

const Awards = ({ data, ...rest }) => {
    const awards = data.awards.edges.map(({ node }) => node)

    return (
        <Layout {...rest}>
            <div>
                <PageHeader showIntro={true} introduction={data.introduction.html} />
                <AwardsBlock data={awards} />
            </div>
        </Layout>
    )
}

export default Awards

export const query = graphql`
    query awardsByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "awards" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        awards: allAwardsYaml(filter: { type: { ne: null } }) {
            edges {
                node {
                    type
                    tools {
                        id
                        percentage
                        count
                    }
                }
            }
        }
    }
`
