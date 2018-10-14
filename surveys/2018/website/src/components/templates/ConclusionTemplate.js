import { graphql } from 'gatsby'
import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'
import QuadrantBlock from '../blocks/QuadrantBlock'

const ConclusionTemplate = ({ pageContext, data }) => {
    const content = data.file.childMarkdownRemark ? data.file.childMarkdownRemark.html : undefined

    return (
        <Layout>
            <div className="template">
                <Meta />
                <QuadrantBlock />
                {content === undefined && (
                    <div style={{ color: 'red' }}>
                        No conclusion found for section: <strong>{pageContext.name}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {content !== undefined && <TextBlock text={content} />}
            </div>
        </Layout>
    )
}

export default ConclusionTemplate

export const query = graphql`
    query($name: String) {
        file(name: { eq: $name }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
