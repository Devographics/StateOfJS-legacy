import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filters from './Filters'
import LocationsBar from './charts/LocationsBar'
import surveyData from '../data/survey.json'

export default class WorldwideUsage extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        defaultTool: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            tool: props.defaultTool,
            mode: 'absolute',
        }
    }

    setTool = tool => {
        this.setState({ tool })
    }

    setMode = mode => {
        this.setState({ mode })
    }

    render() {
        const { title, data, tools } = this.props
        const { tool, mode } = this.state

        const stats = data[tool]
        let buckets = stats.by_location.buckets.filter(({ key }) => key !== 'undefined')
        const ignored = stats.by_location.buckets.find(({ key }) => key === 'undefined')

        // compute percentage according to total location responses
        if (mode !== 'absolute') {
            buckets = buckets
                .filter(({ key }) => surveyData.location[key] !== undefined)
                .map(({ key, doc_count }) => ({
                    key,
                    doc_count: Math.round(doc_count / surveyData.location[key] * 100),
                }))
        }

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Filters filters={tools} filter={tool} onChange={this.setTool} />
                    <Filters
                        filters={['absolute', 'relative (%)']}
                        filter={mode}
                        onChange={this.setMode}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '40%' }} className="description">
                        <p>
                            Locations where <strong>{tool}</strong> has been used & people are
                            willing to continue to do so ({stats.doc_count} people).
                        </p>
                        <p>
                            <strong>{tool}</strong> is most used in{' '}
                            <strong>{buckets[0].key}</strong>.
                        </p>
                        <p>
                            <strong>relative</strong> mode weights counts according to total number
                            of responses in each location. It gives a more balanced overview as
                            locations where a lot of people responded to the survey will often
                            appear on top.
                        </p>
                        <p>
                            Please be aware that those stats only take in account responses we were
                            able to locate ({ignored.doc_count} responses were ignored).
                        </p>
                    </div>
                    <div style={{ width: '58%' }}>
                        <LocationsBar locations={buckets} mode={mode} />
                    </div>
                </div>
            </div>
        )
    }
}
