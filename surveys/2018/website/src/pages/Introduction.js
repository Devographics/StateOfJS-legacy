import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/common/Layout'
import TextBlock from '../components/blocks/TextBlock'
import SponsorsBlock from '../components/blocks/SponsorsBlock'
import SectionHeader from '../components/elements/SectionHeader'

const Introduction = ({ data }) => {
    const projects = data.allProject.edges.map(({ node }) => node)
    return (
    <Layout projects={projects}>
        <div>
            <SectionHeader showIntro={false} />
            <TextBlock text={data.file.childMarkdownRemark.html} />
            <SponsorsBlock />
        </div>
    </Layout>
)}

export default Introduction

export const query = graphql`
    query {
        file(name: { eq: "introduction" }) {
            childMarkdownRemark {
                html
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
