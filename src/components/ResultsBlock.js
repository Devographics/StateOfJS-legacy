import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExperienceLegends from './ExperienceLegends'
import ExperienceBar from './charts/ExperienceBar'
import Libraries from './Libraries'
import { sortDataBy } from '../sorts'
import ShareChart from '../components/common/ShareChart'

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
        const { title, data: _data, description } = this.props
        const { tool } = this.state
        const indexBy = 'tool'

        const data = sortDataBy(_data, indexBy, `I've USED it before, and WOULD use it again`)

        return (
            <div className="section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div style={{ marginBottom: 40 }}>{description !== undefined && description}</div>
                <div className="capture">
                    {/*
                    <Filters
                        filters={['all', 'interest', 'satisfaction']}
                        filter={tool}
                        onChange={this.setTool}
                        className="Filters--experience"
                    />
                    */}
                    <ExperienceLegends />
                    <ExperienceBar facet={tool} data={data} indexBy={indexBy} />
                    <Libraries variant="horizontal" data={data} />
                    <ShareChart section="frontend" />
                </div>
            </div>
        )
    }
}
