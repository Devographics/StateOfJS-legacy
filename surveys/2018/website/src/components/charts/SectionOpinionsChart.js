import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { ResponsiveBar } from '@nivo/bar'
import { navigate } from 'gatsby'
import theme from '../../nivoTheme'
import { getToolName } from '../../helpers/wording'
import OpinionsLegends from '../elements/OpinionsLegends'
import PeriodicTableElementSvg from '../elements/PeriodicTableElementSvg'

const patterns = [
    {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, .07)',
        rotation: -45,
        lineWidth: 3,
        spacing: 6
    }
]

export default class SectionOpinionsChart extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    state = {
        current: null
    }

    setCurrent = legend => {
        this.setState({ current: legend.id })
    }

    resetCurrent = () => {
        this.setState({ current: null })
    }

    getColor = ({ id }) => {
        const { current } = this.state
        if (current !== null && current !== id) {
            return '#212424'
        }

        return theme.opinionColors[id]
    }

    render() {
        const { section, opinions } = this.props

        const surveyData = opinions.find(o => o.survey_id === '2018')
        if (surveyData === undefined) {
            return (
                <div style={{ color: 'red' }}>
                    No data found found for survey: <strong>2018</strong>
                    <br />
                    <br />
                </div>
            )
        }

        const sortedData = sortBy(
            surveyData.tools.map(t => ({
                tool_id: t.tool_id,
                ...t.percentages
            })),
            'would_use'
        ).reverse()

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 210px',
                    gridColumnGap: 20
                }}
            >
                <div style={{ height: 360 }}>
                    <ResponsiveBar
                        margin={{
                            top: 81,
                            bottom: 30
                        }}
                        keys={[
                            'would_use',
                            'would_not_use',
                            'interested',
                            'not_interested',
                            'never_heard'
                        ]}
                        indexBy="tool_id"
                        data={sortedData}
                        theme={theme}
                        colorBy={this.getColor}
                        labelFormat={d => `${d}%`}
                        tooltipFormat={d => `${d}%`}
                        labelTextColor="inherit:darker(1.6)"
                        labelSkipWidth={32}
                        labelSkipHeight={20}
                        padding={0.6}
                        axisLeft={null}
                        axisTop={{
                            renderTick: tick => {
                                return (
                                    <g
                                        key={tick.key}
                                        transform={`translate(${tick.x - 30},${tick.y - 80})`}
                                    >
                                        <PeriodicTableElementSvg
                                            section={section}
                                            tool={tick.value}
                                            size={60}
                                            onClick={() => {
                                                navigate(`${section}/${tick.value}`)
                                            }}
                                        />
                                    </g>
                                )
                            }
                        }}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 10,
                            renderTick: tick => {
                                return (
                                    <g
                                        key={tick.key}
                                        transform={`translate(${tick.x},${tick.y + 14})`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            navigate(`${section}/${tick.value}`)
                                        }}
                                    >
                                        <text
                                            fill="rgb(254, 106, 106)"
                                            textAnchor="middle"
                                            alignmentBaseline="hanging"
                                            style={{ fontSize: '13px' }}
                                        >
                                            {getToolName(tick.value)}
                                        </text>
                                    </g>
                                )
                            }
                        }}
                        defs={patterns}
                        fill={[
                            {
                                match: {
                                    id: 'never_heard'
                                },
                                id: 'lines'
                            }
                        ]}
                    />
                </div>
                <OpinionsLegends
                    layout="vertical"
                    withFrame={false}
                    onMouseEnter={this.setCurrent}
                    onMouseLeave={this.resetCurrent}
                    style={{
                        marginTop: 81,
                        marginBottom: 30
                    }}
                />
            </div>
        )
    }
}
