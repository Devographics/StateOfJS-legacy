import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const Conclusion = ({ data }) => {
    return <PageTemplate data={data} />
}

export default Conclusion

export const query = graphql`
    query conclusionByLocale($locale: String!) {
        conclusion: markdownRemark(
            frontmatter: {
                type: { eq: "conclusion" }
                section: { eq: "conclusion" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
