import React from 'react'
import otherToolsData from '../data/otherTools.json'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import BarBlock from '../components/blocks/BarBlock'
import { graphql } from 'gatsby'
import TextBlock from '../components/blocks/TextBlock'

const OtherTools = ({ data, ...rest }) => (
    <Layout {...rest}>
        <div className="page">
            <SectionHeader />
            <TextBlock text={data.file.childMarkdownRemark.html} />
            {otherToolsData.keys.map(otherTool => {
                const data = otherToolsData.aggs[otherTool].buckets
                console.log(data)
                return (
                    <div className="Block Block--chart block block--chart" key={otherTool}>
                        <BarBlock data={data} title={otherTool} />
                    </div>
                )
            })}
        </div>
    </Layout>
)

export default OtherTools

export const query = graphql`
    query {
        file(name: { eq: "othertools-introduction" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
