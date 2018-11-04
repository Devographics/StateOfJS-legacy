import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import ToolHeaderBlock from '../blocks/ToolHeaderBlock'
import ToolOpinionsOverTimeBlock from '../blocks/ToolOpinionsOverTimeBlock'
import ReasonsBlock from '../blocks/ReasonsBlock'
import ToolUsageByCountryBlock from '../blocks/ToolUsageByCountryBlock'
import SponsorsBlock from '../blocks/SponsorsBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'

const ToolTemplate = ({ pageContext, data }) => {
    // console.log(pageContext, data)

    // this block is skipped if it doesn't appear at least in 2 surveys
    let shouldDisplayExperienceOverTime = false
    if (data.toolsYaml !== null && data.toolsYaml.appears_in_surveys.length > 1) {
        shouldDisplayExperienceOverTime = true
    }

    const wouldUseByCountryData = data.toolsYaml.would_use_by_country.find(d => d.survey === '2018')
    const { tool, section } = pageContext

    return (
        <Layout>
            <div className="template">
                <Meta />
                <ToolHeaderBlock section={section} tool={tool} />
                {shouldDisplayExperienceOverTime ? (
                    <ToolOpinionsOverTimeBlock
                        tool={tool}
                        opinions={data.toolsYaml.experience}
                    />
                ) : (
                    <p className="tool-over-time-no-data">
                        Sorry, we don&apos;t have enough data to display the evolution of this
                        library's popularity over time.
                    </p>
                )}
                <ReasonsBlock tool={tool} reasons={data.toolsYaml.reasons} />
                {/* <SponsorsBlock tool={tool} /> */}
                <ResourcesBlock tool={tool} />
                <ToolUsageByCountryBlock tool={tool} data={wouldUseByCountryData} />
            </div>
        </Layout>
    )
}

export default ToolTemplate

export const query = graphql`
    query toolBySlug($tool: String!) {
        toolsYaml(tool_id: { eq: $tool }) {
            tool_id
            appears_in_surveys
            experience {
                by_survey {
                    survey
                    counts {
                        would_not_use
                        not_interested
                        would_use
                        interested
                        never_heard
                    }
                    percentages {
                        would_not_use
                        not_interested
                        would_use
                        interested
                        never_heard
                    }
                }
            }
            would_use_by_country {
                survey
                percentage
                buckets {
                    country
                    total
                    count
                    percentage
                    delta_from_average
                }
            }
            reasons {
                like {
                    id
                    count
                }
                dislike {
                    id
                    count
                }
            }
        }
    }
`
