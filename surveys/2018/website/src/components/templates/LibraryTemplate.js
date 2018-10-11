import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'

const LibraryTemplate = ({ pageContext, data }) => {
    console.log(pageContext, data)

    return (
        <Layout>
            <div className="template">
                <Meta />
                <TextBlock text={'library template'} />
                {data.toolsYaml === null && (
                    <div style={{ color: 'red' }}>
                        No yaml file found for tool: <strong>{pageContext.tool}</strong>
                    </div>
                )}
                {data.toolsYaml !== null && (
                    <div>
                        Found tool yaml file for: <strong>{pageContext.tool}</strong>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query toolBySlug($tool: String!) {
        toolsYaml(slug: { eq: $tool }) {
            id
            slug
        }
    }
`

export default LibraryTemplate
