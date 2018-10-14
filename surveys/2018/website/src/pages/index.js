import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/common/Layout'
import TextBlock from '../components/blocks/TextBlock'

const Introduction = ({ data }) => (
    <Layout>
        <div>
            <TextBlock text={data.file.childMarkdownRemark.html} />
        </div>
    </Layout>
)

export default Introduction

export const query = graphql`
    query {
        file(name: { eq: "introduction" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
