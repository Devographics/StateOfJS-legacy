import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import ExperienceOverTimeBlock from '../blocks/ExperienceOverTimeBlock'
import ReasonsBlock from '../blocks/ReasonsBlock'
import bestOfJsData from '../../data/bestofjs'

const ToolTemplate = ({ pageContext, data }) => {
    console.log(pageContext, data)

    // this block is skipped if it doesn't appear at least in 2 surveys
    let shouldDisplayExperienceOverTime = false
    if (data.toolsYaml !== null && data.toolsYaml.appears_in_surveys.length > 1) {
        shouldDisplayExperienceOverTime = true
    }

    const bestOfJsProject = bestOfJsData.projects.find(p => p.slug === pageContext.tool)
    console.log(bestOfJsProject)

    return (
        <Layout>
            <div className="template">
                <Meta />
                {bestOfJsProject === undefined && (
                    <div style={{ color: 'red' }}>
                        No project found in best of js data matching tool:{' '}
                        <strong>{pageContext.tool}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {data.toolsYaml === null && (
                    <div style={{ color: 'red' }}>
                        No yaml file found for tool: <strong>{pageContext.tool}</strong>
                        <br />
                        <br />
                    </div>
                )}
                {bestOfJsProject !== undefined && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr'
                        }}
                    >
                        <div>
                            <h2>{bestOfJsProject.name}</h2>
                            {bestOfJsProject.stars} stars
                        </div>
                        <div>
                            <div>{bestOfJsProject.description}</div>
                            <div>
                                homepage: {bestOfJsProject.homepage}
                                <br />
                                github: {bestOfJsProject.github}
                            </div>
                        </div>
                    </div>
                )}
                {shouldDisplayExperienceOverTime && (
                    <ExperienceOverTimeBlock experience={data.toolsYaml.experience} />
                )}
                {data.toolsYaml !== null && <ReasonsBlock reasons={data.toolsYaml.reasons} />}
                {data.toolsYaml !== null && (
                    <div>
                        <h3 className="block__title">Country stats</h3>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query toolBySlug($tool: String!) {
        toolsYaml(tool_id: { eq: $tool }) {
            tool_id
            appears_in_surveys
            experience {
                all {
                    would_not_use
                    not_interested
                    would_use
                    interested
                    never_heard
                }
                by_survey {
                    survey
                    would_not_use
                    not_interested
                    would_use
                    interested
                    never_heard
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

export default ToolTemplate
