import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { getToolName } from '../../helpers/wording'
import PeriodicElement from '../elements/PeriodicElement'
import periodicTableData from '../../data/periodic_table.yml'
import ranking from '../../data/results/tools_ranking.yml'

const starsFormatter = format('.2s')

export default class ToolHeaderBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired,
        projects: PropTypes.array.isRequired
    }

    render() {
        const { tool, projects } = this.props
        const project = projects.find(p => p.id === tool)
        return (
            <div className="Block ToolHeader">
                <div className="ToolHeader__Element">
                    <PeriodicElement
                        tool={tool}
                        name={getToolName(tool, projects)}
                        symbol={periodicTableData.tools[tool] || '??'}
                        number={`#${ranking[tool]}` || '?'}
                    />
                </div>
                <div className="ToolHeader__Content">
                    <div className="ToolHeader__Header">
                        <h2 className="ToolHeader__Title">{getToolName(tool, projects)}</h2>
                        {project && (
                            <div className="ToolHeader__Stars">
                                {starsFormatter(project.stars)} stars
                            </div>
                        )}
                    </div>
                    {project && (
                        <Fragment>
                            <div>{project.description}</div>
                            <div className="ToolHeader__Links">
                                {project.homepage && (
                                    <a
                                        className="ToolHeader__Link button button--small"
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Homepage
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
                    )}
                </div>
            </div>
        )
    }
}
