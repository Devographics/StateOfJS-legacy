import React from 'react'
import keyBy from 'lodash/keyBy'
import { graphql } from 'gatsby'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import TextBlock from '../components/blocks/TextBlock'
import OpinionBlock from '../components/blocks/OpinionBlock'
import { globalOpinionSubjects } from '../constants'

const Opinions = ({ data, ...rest }) => {
    const opinions = keyBy(data.opinions.edges.map(e => e.node), 'subject')

    return (
        <Layout {...rest}>
            <div>
                <SectionHeader />
                <TextBlock text={data.file.childMarkdownRemark.html} />
                {globalOpinionSubjects.map(subject => (
                    <OpinionBlock
                        key={subject}
                        subject={subject}
                        data={opinions[subject].by_survey}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default Opinions

export const query = graphql`
    query {
        file(name: { eq: "opinions-introduction" }) {
            childMarkdownRemark {
                html
            }
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
