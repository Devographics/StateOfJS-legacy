import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from '../core/pages/PageTemplate'

const UnitsAndSelectorsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default UnitsAndSelectorsPage

export const query = graphql`
    query unitsAndSelectors {
        data: unitsAndSelectorsYaml(section_id: { eq: "units-and-selectors" }) {
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
