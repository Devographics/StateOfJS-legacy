import { graphql } from 'gatsby'
import React from 'react'
import TextBlock from '../core/blocks/TextBlock'
import SponsorsBlock from '../core/blocks/SponsorsBlock'
import PageHeader from '../core/pages/PageHeader'

const Introduction = ({ data }) => (
    <>
        <PageHeader showIntro={false} />
        <TextBlock text={data.introduction.html} />
        <SponsorsBlock />
    </>
)

export default Introduction

export const query = graphql`
    query introByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "introduction" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
