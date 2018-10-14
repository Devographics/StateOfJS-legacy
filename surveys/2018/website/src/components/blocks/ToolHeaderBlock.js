import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bestOfJsData from '../../data/bestofjs'
import PeriodicTableElementHtml from '../elements/PeriodicTableElementHtml'

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
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '150px auto',
                    gridColumnGap: 40,
                    marginBottom: 40
                }}
            >
                <div>
                    <PeriodicTableElementHtml size={150} section={section} tool={tool} />
                </div>
                <div>
                    <h2>{project.name}</h2>
                    <div>{project.stars} stars</div>
                    <div>{project.description}</div>
                    <div>
                        homepage: {project.homepage}
                        <br />
                        github: {project.github}
                    </div>
                </div>
            </div>
        )
    }
}
