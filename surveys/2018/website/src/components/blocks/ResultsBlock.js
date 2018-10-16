import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResultsBar from '../charts/ResultsBar'
import Libraries from '../elements/Libraries'
import { sortDataBy } from '../../sorts'
import ShareChart from '../common/ShareChart'
import { experience, experienceColors } from '../../constants'
import Legends from '../elements/Legends'
import getWording from '../../helpers/getWording'
import BlockTitle from '../elements/BlockTitle'

const legends = [
    experience.never_heard,
    experience.not_interested,
    experience.would_learn,
    experience.would_not_use,
    experience.would_use
].map(key => ({
    label: key,
    color: experienceColors[key]
}))

export default class ResultsBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array.isRequired,
        description: PropTypes.node,
        section: PropTypes.string.isRequired
    }

    state = {
        tool: 'all'
    }

    render() {
        const { data: _data, description, section } = this.props
        const { tool } = this.state
        const indexBy = 'tool'

        const data = sortDataBy(_data, indexBy, `I've USED it before, and WOULD use it again`)

        return (
            <div className="block block--chart block--results">
                <BlockTitle chart='overview'/>
                {description ? (
                    <div className="block__description">
                        <p>{description}</p>
                    </div>
                ) : (
                    <div className="block__description">
                        <p>{getWording('charts', 'overview.description')}</p>
                    </div>
                )}
                <div className="block__contents capture">
                    <div className="block__contents__inner">
                        <Legends legends={legends} modifier="horizontal" />
                        <ResultsBar facet={tool} data={data} indexBy={indexBy} />
                        <Libraries variant="horizontal" data={data} />
                    </div>
                </div>
                <ShareChart section={section} subSection="results" />
            </div>
        )
    }
}
