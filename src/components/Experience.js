import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExperienceLegends from './ExperienceLegends'
import ExperienceBar from './charts/ExperienceBar'

export default class Experience extends Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array.isRequired,
    }

    state = {
        tool: 'all',
    }

    setTool = tool => {
        this.setState({ tool })
    }

    render() {
        const { title, data, description } = this.props
        const { tool } = this.state

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div style={{ marginBottom: 40 }}>{description !== undefined && description}</div>
                <div>
                    {/*
                    <Filters
                        filters={['all', 'interest', 'satisfaction']}
                        filter={tool}
                        onChange={this.setTool}
                        className="Filters--experience"
                    />
                    */}
                    <ExperienceBar facet={tool} data={data} indexBy="tool" />
                    <ExperienceLegends />
                </div>
            </div>
        )
    }
}
