import React from 'react'
import opinionsData from '../data/opinions.json'
import OpinionBar from '../components/charts/OpinionBar'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import { graphql } from 'gatsby'
import TextBlock from '../components/blocks/TextBlock'

const Opinions = ({ data, ...rest }) => (
    <Layout {...rest}>
        <div>
            <SectionHeader />
            <TextBlock text={data.file.childMarkdownRemark.html} />
            {opinionsData.keys.map(opinion => (
                <div className="block block--chart" key={opinion}>
                    <h3 className="block__title">“{opinion}”</h3>
                    <OpinionBar opinion={opinion} />
                </div>
            ))}
        </div>
    </Layout>
)

export default Opinions

export const query = graphql`
    query {
        file(name: { eq: "opinions-introduction" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
