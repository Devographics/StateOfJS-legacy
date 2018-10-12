import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/common/Layout'
import TextBlock from '../components/blocks/TextBlock'

const Introduction = ({ data }) => (
    <Layout>
        <div>
            <TextBlock text={data.allFile.edges[0].node.childMarkdownRemark.html} />
        </div>
    </Layout>
)

export default Introduction

export const query = graphql`
    query {
        allFile(
            filter: {
                internal: { mediaType: { eq: "text/markdown" } }
                name: { eq: "introduction" }
            }
        ) {
            edges {
                node {
                    childMarkdownRemark {
                        html
                    }
                }
            }
        }
    }
`
