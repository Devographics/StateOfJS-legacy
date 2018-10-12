import { graphql } from 'gatsby'
import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'
import QuadrantBlock from '../blocks/QuadrantBlock'

const ConclusionTemplate = ({ data }) => (
    <Layout>
        <div className="template">
            <Meta />
            <QuadrantBlock />
            <TextBlock text={data.allFile.edges[0].node.childMarkdownRemark.html} />
        </div>
    </Layout>
)

export default ConclusionTemplate

export const query = graphql`
    query($section: String) {
        allFile(
            filter: { internal: { mediaType: { eq: "text/markdown" } }, name: { eq: $section } }
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
