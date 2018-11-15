import React from 'react'
import { graphql } from 'gatsby'
import { getWording } from '../helpers/wording'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import BarBlock from '../components/blocks/BarBlock'
import TextBlock from '../components/blocks/TextBlock'

const OtherTools = ({ data, ...rest }) => {
    const topics = data.topics.edges.map(({ node }) => node)
    const projects = data.allProject.edges.map(({ node }) => node)
    return (
        <Layout projects={projects} {...rest}>
            <div className="page">
                <SectionHeader />
                <TextBlock text={data.file.childMarkdownRemark.html} />
                {topics.map(topic => {
                    const data = topic.tools
                        .map(d => ({
                            name: d.tool,
                            count: d.count
                        }))
                        .reverse()

                    return (
                        <div className="Block Block--chart block block--chart" key={topic.topic}>
                            <BarBlock
                                data={data}
                                title={getWording(`other_tools.${topic.topic}`)}
                                projects={projects}
                            />
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export default OtherTools

export const query = graphql`
    query {
        file(name: { eq: "othertools-introduction" }) {
            childMarkdownRemark {
                html
            }
        }
        topics: allOtherToolsYaml {
            edges {
                node {
                    topic
                    tools {
                        tool
                        count
                    }
                }
            }
        }
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
