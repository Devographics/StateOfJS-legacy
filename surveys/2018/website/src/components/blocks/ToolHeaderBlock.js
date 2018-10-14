import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import bestOfJsData from '../../data/bestofjs'
import PeriodicTableElementHtml from '../elements/PeriodicTableElementHtml'

const starsFormatter = format('.2s')

export default class ToolHeaderBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired
    }

    render() {
        const { section, tool } = this.props

        const project = bestOfJsData.projects.find(p => p.slug === tool)

        if (project === undefined) {
            return (
                <div style={{ color: 'red' }}>
                    No project found in best of js data matching tool: <strong>{tool}</strong>
                    <br />
                    <br />
                </div>
            )
        }

        return (
            <div className="ToolHeader">
                <div>
                    <PeriodicTableElementHtml size={150} section={section} tool={tool} />
                </div>
                <div>
                    <div className="ToolHeader_Header">
                        <h2 className="ToolHeader_Title">{project.name}</h2>
                        <div>{starsFormatter(project.stars)} stars</div>
                    </div>
                    <div>{project.description}</div>
                    <div className="ToolHeader_Links">
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                            {project.homepage}
                        </a>
                        {' | '}
                        <a
                            href={`https://github.com/${project.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            github
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
