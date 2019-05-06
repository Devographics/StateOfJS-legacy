import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const OtherToolsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default OtherToolsPage

export const query = graphql`
    query otherTools {
        data: otherToolsYaml(section_id: { eq: "other-tools" }) {
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
