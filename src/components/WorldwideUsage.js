import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filters from './Filters'
import CountryBubble from './charts/CountryBubble'
import surveyData from '../data/survey.json'

export default class WorldwideUsage extends Component {
    static propTypes = {
        //title: PropTypes.string.isRequired,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            tool: null,
        }
    }

    setTool = tool => {
        this.setState({ tool })
    }

    render() {
        const { title, countries, tools } = this.props

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div className="description">
                    <p>
                        Locations where tools have been used & people are
                        willing to continue to do so.<br/>
                        Please be aware that those stats only take in account
                        responses we were able to locate.
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                    {countries.filter(({ key }) => key !== 'undefined').map(country => (
                        <div key={country.key} style={{
                            width: '24%',
                            marginBottom: 30
                        }}>
                            <div style={{ height: 220, marginBottom: 12 }}>
                                <CountryBubble
                                    keys={tools}
                                    data={country}
                                />
                            </div>
                            <h4 style={{ textAlign: 'center' }}>{country.key}</h4>
                        </div>
                    ))}
                </div>
            </div>
        )


        /*
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Filters filters={tools} filter={tool} onChange={this.setTool} />
                    <Filters
                        filters={['absolute', 'relative (%)']}
                        filter={mode}
                        onChange={this.setMode}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div style={{ width: '58%' }}>
                        <LocationsBar locations={buckets} mode={mode} />
                    </div>
                </div>
            </div>
        )
        */
    }
}
