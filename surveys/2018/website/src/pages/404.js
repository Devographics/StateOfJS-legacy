import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/common/Layout'
import TextBlock from '../components/blocks/TextBlock'

const Introduction = ({data}) => {
    const projects = data.allProject.edges.map(({ node }) => node)
    return(
    <Layout title="Page Not Found" showPagination={false} projects={projects}>
        <div>
            <TextBlock text={`404 not found`} />
        </div>
    </Layout>
)}

export const query = graphql`
    {
        allProject {
            edges {
                node {
                    id,
                    name,
                    stars,
                    github,
                    description,
                    homepage
                }
            }
        }
    }
`

export default Introduction
