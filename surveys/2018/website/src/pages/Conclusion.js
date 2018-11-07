import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Newsletter from '../components/common/Newsletter'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import { graphql } from 'gatsby'

const newsletterText = `
If you'd like to know when we release additional results or announce next year's edition, just leave us your email below:
`

const Conclusion = ({ data, rest }) => (
    <Layout {...rest}>
        <div>
            <SectionHeader showIntro={false} />
            <TextBlock text={data.file.childMarkdownRemark.html} />

            <div className="block block--newsletter">
                <TextBlock title="Stay Tuned" text={newsletterText} />
                <Newsletter />
            </div>
        </div>
    </Layout>
)

export default Conclusion

export const query = graphql`
    query {
        file(name: { eq: "conclusion-conclusion" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`
