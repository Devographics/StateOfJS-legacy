import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const ResourcesPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default ResourcesPage

export const query = graphql`
    query resources {
        data: learningResourcesYaml(section_id: { eq: "resources" }) {
            aggregations {
                id
                buckets {
                    id
                    count
                    percentage
                }
            }
        }
    }
`
