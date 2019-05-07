import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const EnvironmentsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default EnvironmentsPage

export const query = graphql`
    query environments {
        data: environmentsYaml(section_id: { eq: "environments" }) {
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
