import React from 'react'
import keyBy from 'lodash/keyBy'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import TextBlock from 'core/blocks/TextBlock'
import OpinionBlock from 'modules/opinions/OpinionBlock'
import { globalOpinionSubjects } from '../constants'

const Opinions = ({ data, ...rest }) => {
    const opinions = keyBy(data.opinions.edges.map(e => e.node), 'subject')

    return (
        <Layout {...rest}>
            <div>
                <PageHeader />
                <TextBlock text={data.introduction.html} />
                {globalOpinionSubjects.map(subject => (
                    <OpinionBlock
                        key={subject}
                        subject={subject}
                        data={opinions[subject].by_survey}
                        chartId={`opinion-${subject}`}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default Opinions

export const query = graphql`
    query opinions($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "opinions" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        opinions: allGlobalOpinionsYaml {
            edges {
                node {
                    subject
                    by_survey {
                        survey
                        total
                        by_choice {
                            choice
                            count
                            percentage
                        }
                    }
                }
            }
        }
    }
`
