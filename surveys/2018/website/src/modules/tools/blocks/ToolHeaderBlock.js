import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import bestOfJsData from 'data/bestofjs'
import periodicTableData from 'data/periodic_table.yml'
import ranking from 'data/results/tools_ranking.yml'
import PeriodicElement from 'core/components/PeriodicElement'
import Trans from 'core/i18n/Trans'
import { translateOrFallback } from 'core/i18n/translator'
import { libraryDescriptionToTranslationKey } from 'core/i18n/translation-key-getters'
import { getToolName } from 'core/helpers/tools'

const starsFormatter = format('.2s')

export default class ToolHeaderBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired
    }

    render() {
        const { tool } = this.props

        return (
            <Trans>
                {translate => {
                    const toolName = getToolName(tool, translate)
                    const project = bestOfJsData.projects.find(p => p.slug === tool) || {
                        description: translate(`tool.${tool}.description`)
                    }

                    return (
                        <div className="Block ToolHeader">
                            <div className="ToolHeader__Element">
                                <PeriodicElement
                                    tool={tool}
                                    name={toolName}
                                    symbol={periodicTableData.tools[tool] || '??'}
                                    number={`#${ranking[tool]}` || '?'}
                                />
                            </div>
                            <div className="ToolHeader__Content">
                                <div className="ToolHeader__Header">
                                    <h2 className="ToolHeader__Title">{toolName}</h2>
                                    {project.stars && (
                                        <div className="ToolHeader__Stars">
                                            {starsFormatter(project.stars)}{' '}
                                            {translateOrFallback(
                                                translate('github_stars'),
                                                'stars'
                                            )}
                                        </div>
                                    )}
                                </div>
                                <Fragment>
                                    <div>
                                        {translateOrFallback(
                                            translate(libraryDescriptionToTranslationKey(toolName)),
                                            project.description
                                        )}
                                    </div>
                                    <div className="ToolHeader__Links">
                                        {project.homepage && (
                                            <a
                                                className="ToolHeader__Link button button--small"
                                                href={project.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {translate('tool_homepage')}
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                className="ToolHeader__Link button button--small"
                                                href={`https://github.com/${project.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </Fragment>
                            </div>
                        </div>
                    )
                }}
            </Trans>
        )
    }
}
