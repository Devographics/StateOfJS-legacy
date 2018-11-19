import React from 'react'
import AwardsBlock from '../components/blocks/AwardsBlock'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import { graphql } from 'gatsby'

const Awards = ({ data, ...rest }) => {
    const awards = data.awards.edges.map(({ node }) => node)

    return (
        <Layout {...rest}>
            <div>
                <SectionHeader showIntro={true} />
                <AwardsBlock data={awards} />
            </div>
        </Layout>
    )
}

export default Awards

export const query = graphql`
    query {
        awards: allAwardsYaml(filter: { type: { ne: null } }) {
            edges {
                node {
                    type
                    tools {
                        id
                        percentage
                        count
                    }
                }
            }
        }
    }
`
