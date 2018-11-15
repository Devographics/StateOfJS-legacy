import React from 'react'
import AwardsBlock from '../components/blocks/AwardsBlock'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import { graphql } from 'gatsby'

const Awards = ({ data, ...rest }) => (
    <Layout {...rest}>
        <div>
            <SectionHeader showIntro={true} />
            <AwardsBlock />
        </div>
    </Layout>
)

export default Awards

export const query = graphql`
    query {
        file(name: { eq: "conclusion-conclusion" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
