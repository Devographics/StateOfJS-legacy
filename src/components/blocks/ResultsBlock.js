import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResultsBar from '../charts/ResultsBar'
import Libraries from '../elements/Libraries'
import { sortDataBy } from '../../sorts'
import ShareChart from '../common/ShareChart'
import { experience, experienceColors } from '../../constants'
import Legends from '../elements/Legends'

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

export default class ResultsBlock extends Component {
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
        const { title, data: _data, description, section } = this.props
        const { tool } = this.state
        const indexBy = 'tool'

        const data = sortDataBy(_data, indexBy, `I've USED it before, and WOULD use it again`)

        return (
            <div className="block block--chart block--results">
                <h3 className="block__title">Libraries Results</h3>
                {description ? 
                    <div className="block__description"><p>{description}</p></div> :
                    <div className="block__description"><p>Per-library survey results.</p></div>
                }
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
                    <ResultsBar facet={tool} data={data} indexBy={indexBy} />
                    <Libraries variant="horizontal" data={data} />
                </div>
                <ShareChart section={section} subSection="results" />
                
            </div>
        )
    }
}
