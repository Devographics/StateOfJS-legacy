import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExperienceBar from '../charts/ExperienceBar'
import Libraries from '../elements/Libraries'
import { sortDataBy } from '../../sorts'
import ShareChart from '../common/ShareChart'
import { experience, experienceColors } from '../../constants'

const legends = [
    experience.never_heard,
    experience.not_interested,
    experience.would_learn,
    experience.would_not_use,
    experience.would_use,
].map(key => ({
    label: key,
    color: experienceColors[key],
}))

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
                    <Legends legends={legends} modifier="horizontal" />
                    <ExperienceBar facet={tool} data={data} indexBy={indexBy} />
                    <Libraries variant="horizontal" data={data} />
                    <ShareChart section="frontend" />
                </div>
            </div>
        )
    }
}
