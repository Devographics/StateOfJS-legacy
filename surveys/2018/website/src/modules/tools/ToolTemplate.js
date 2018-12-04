import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageMeta from 'core/pages/PageMeta'
import ResourcesBlock from 'core/blocks/ResourcesBlock'
import TransText from 'core/i18n/TransText'
import ToolHeaderBlock from './blocks/ToolHeaderBlock'
import ToolOpinionsOverTimeBlock from './blocks/ToolOpinionsOverTimeBlock'
import ReasonsBlock from './blocks/ReasonsBlock'
import ToolUsageByCountryBlock from './blocks/ToolUsageByCountryBlock'
import ToolPairingBlock from './blocks/ToolPairingBlock'

const ToolTemplate = ({ pageContext, data, ...rest }) => {
    // this block is skipped if it doesn't appear at least in 2 surveys
    let shouldDisplayExperienceOverTime = false
    if (data.tool.appears_in_surveys.length > 1) {
        shouldDisplayExperienceOverTime = true
    }

    const wouldUseByCountryData = data.tool.would_use_by_country
    const { tool, section } = pageContext

    return (
        <Layout pageContext={pageContext} {...rest}>
            <div className="template">
                <PageMeta />
                <ToolHeaderBlock section={section} tool={tool} />
                {shouldDisplayExperienceOverTime ? (
                    <ToolOpinionsOverTimeBlock
                        tool={tool}
                        opinions={data.tool.experience}
                        chartId="results-over-time"
                    />
                ) : (
                    <p className="block tool-over-time-no-data" id="results-over-time">
                        <TransText id="block.results-over-time.empty" />
                    </p>
                )}
                <ReasonsBlock
                    tool={tool}
                    reasons={data.tool.reasons}
                    chartIdLikes="likes"
                    chartIdDislikes="dislikes"
                />
                {/* <SponsorsBlock tool={tool} /> */}
                <ResourcesBlock tool={tool} />
                <ToolPairingBlock tool={tool} data={data.tool.pairing} chartId="tool-pairing" />
                <ToolUsageByCountryBlock
                    tool={tool}
                    data={wouldUseByCountryData}
                    chartId="tool-usage-by-country"
                />
            </div>
        </Layout>
    )
}

ToolTemplate.propTypes = {
    data: PropTypes.shape({
        tool: PropTypes.shape({
            appears_in_surveys: PropTypes.arrayOf(PropTypes.string).isRequired,
            experience: PropTypes.shape({}).isRequired,
            pairing: PropTypes.arrayOf(
                PropTypes.shape({
                    section: PropTypes.string.isRequired,
                    tools: PropTypes.arrayOf(
                        PropTypes.shape({
                            tool: PropTypes.string.isRequired,
                            score: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default ToolTemplate

export const query = graphql`
    query toolBySlug($tool: String!) {
        tool: toolsYaml(tool_id: { eq: $tool }) {
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
            pairing {
                section
                tools {
                    tool
                    total
                    count
                    score
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
