import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PeriodicElement from './PeriodicElement'
import { getWording, getToolName } from '../../helpers/wording'
import periodicTableData from '../../data/periodic_table.yml'
import ReactMarkdown from 'react-markdown'
import ShareChart from '../common/ShareChart'
import slugify from '../../helpers/slugify'

export default class Award extends Component {
    static propTypes = {
        type: PropTypes.oneOf([
            'highest_satisfaction',
            'highest_interest',
            'highest_usage',
            'most_mentioned',
            'prediction',
            'special'
        ]).isRequired,
        tools: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    state = {
        isRevealed: false
    }

    handleClick = () => {
        this.setState({ isRevealed: true })
    }

    render() {
        const { type, tools: _tools } = this.props
        const { isRevealed } = this.state
        const chartId = slugify(type)

        const tools = _tools.map(tool => ({
            ...tool,
            label: getToolName(tool.id)
        }))

        const winner = tools[0]
        const runnerUps = tools.slice(1)

        return (
            <div className={`Award Award--${isRevealed ? 'show' : 'hide'}`} id={chartId}>
                <h3 className="Award__Heading">{getWording(`award.${type}.heading`)}</h3>
                <div className="Award__Description">{getWording(`award.${type}.description`)}</div>
                <div className="Award__Element__Container">
                    <div className="Award__Element" onClick={this.handleClick}>
                        <PeriodicElement
                            className="Award__Element__Face Award__Element__Face--front"
                            symbol="?"
                            name={null}
                            number={null}
                            size={150}
                        />
                        <PeriodicElement
                            className="Award__Element__Face Award__Element__Face--back"
                            symbol={periodicTableData.tools[winner.id]}
                            name={winner.label}
                            number={1}
                            size={150}
                        />
                    </div>
                </div>
                <div className="Award__Comment">
                    <ReactMarkdown
                        source={getWording(`award.${type}.comment`, {
                            tools
                        })}
                    />
                    <ShareChart
                        title={`${getWording(`award.${type}.heading`)} Award`}
                        chartId={chartId}
                        className="Award__Share"
                    />
                </div>
                <div className="Awards__RunnerUps">
                    <h4 className="Awards__RunnerUps__Heading">
                        {getWording(`awards_runner_ups`)}
                    </h4>
                    {runnerUps.map((runnerUp, i) => (
                        <div
                            key={runnerUp.id}
                            className={`Awards__RunnerUps__Item Awards__RunnerUps__Item--${i}`}
                        >
                            {i + 2}. {getWording(`award.${type}.runner_up`, { tool: runnerUp })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
