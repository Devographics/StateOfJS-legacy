import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import PeriodicElement from 'core/components/PeriodicElement'
import { getToolName } from 'core/helpers/tools'
import periodicTableData from 'data/periodic_table.yml'
import ShareBlock from 'core/share/ShareBlock'
import ShareBlockDebug from 'core/share/ShareBlockDebug'
import slugify from 'core/helpers/slugify'
import Trans from 'core/i18n/Trans'

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
        const blockId = slugify(type)

        return (
            <Trans>
                {translate => {
                    const tools = _tools.map(tool => ({
                        ...tool,
                        label: getToolName(tool.id, translate)
                    }))

                    const winner = tools[0]
                    const runnerUps = tools.slice(1)

                    return (
                        <div
                            className={`Award Award--${isRevealed ? 'show' : 'hide'}`}
                            id={blockId}
                        >
                            <h3 className="Award__Heading">{translate(`block.title.${type}`)}</h3>
                            <div className="Award__Description">
                                {translate(`block.description.${type}`)}
                            </div>
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
                                    source={translate(`award.${type}.comment`, {
                                        values: { tools }
                                    })}
                                />
                                <ShareBlock
                                    title={`${translate(`award.${type}.heading`)} Award`}
                                    id={blockId}
                                    className="Award__Share"
                                />
                                <ShareBlockDebug id={blockId} />
                            </div>
                            <div className="Awards__RunnerUps">
                                <h4 className="Awards__RunnerUps__Heading">
                                    {translate(`awards_runner_ups`)}
                                </h4>
                                {runnerUps.map((runnerUp, i) => (
                                    <div
                                        key={runnerUp.id}
                                        className={`Awards__RunnerUps__Item Awards__RunnerUps__Item--${i}`}
                                    >
                                        {i + 2}.{' '}
                                        {translate(`award.${type}.runner_up`, {
                                            values: { tool: runnerUp }
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }}
            </Trans>
        )
    }
}
