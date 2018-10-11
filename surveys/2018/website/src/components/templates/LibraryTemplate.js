import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import ExperienceOverTime from '../blocks/ExperienceOverTime'

const LibraryTemplate = ({ pageContext, data }) => {
    console.log(pageContext, data)

    return (
        <Layout>
            <div className="template">
                <Meta />
                {data.toolsYaml === null && (
                    <div style={{ color: 'red' }}>
                        No yaml file found for tool: <strong>{pageContext.tool}</strong>
                        <br/>
                        <br/>
                    </div>
                )}
                {data.toolsYaml !== null && (
                    <div>
                        <ExperienceOverTime/>
                        <h3 className="block__title">Reasons behind like/dislike</h3>
                        <h3 className="block__title">Country stats</h3>
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
