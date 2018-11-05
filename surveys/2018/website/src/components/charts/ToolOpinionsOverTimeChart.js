import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from '../../nivoTheme'
import { toolOpinionKeys } from '../../constants'
import OpinionsLegends from '../elements/OpinionsLegends'

const Dot = ({ x, y, data, current }) => {
    if (current !== null && data.key !== current) {
        return null
    }

    const availableHeight = data.y1 - data.y2
    if (availableHeight < 8 && current === null) return null

    return (
        <g transform={`translate(${x},${y})`}>
            <rect fill={'rgba(255,255,255,0.7)'} x={-23} y={-11} width={46} height={22} r={16} />
            <text
                x={15}
                fill="#212424"
                textAnchor="end"
                alignmentBaseline="middle"
                style={{
                    fontSize: 11,
                    fontWeight: 600
                }}
            >
                {data.value}%
            </text>
        </g>
    )
}

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

const margin = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 20
}

export default class ToolOpinionsOverTimeChart extends Component {
    state = {
        current: null
    }

    setCurrent = legend => {
        this.setState({ current: legend.id })
    }

    resetCurrent = () => {
        this.setState({ current: null })
    }

    getLayerColor = keyIndex => {
        const { current } = this.state

        const key = toolOpinionKeys[keyIndex]
        if (current !== null && current !== key) {
            return `${theme.opinionColors[key]}33`
        }

        return theme.opinionColors[key]
    }

    render() {
        const { opinions } = this.props
        const { current } = this.state

        const data = opinions.map(xp => ({
            id: xp.survey,
            ...xp.percentages
        }))

        const horizontalAxis = {
            tickSize: 10,
            tickPadding: 6,
            format: i => this.props.opinions[i].survey
        }

        return (
            <div className="OverTime__Chart">
                <div
                    style={{
                        height: 300
                    }}
                >
                    <ResponsiveStream
                        theme={{
                            ...theme,
                            axis: theme.streamTimelineAxis
                        }}
                        offsetType="expand"
                        colors={this.getLayerColor}
                        curve="monotoneX"
                        margin={margin}
                        keys={toolOpinionKeys}
                        data={data}
                        enableGridX={false}
                        enableGridY={false}
                        axisLeft={undefined}
                        axisTop={horizontalAxis}
                        axisBottom={horizontalAxis}
                        enableDots={true}
                        renderDot={d => <Dot {...d} current={current} />}
                        dotColor="inherit:brighter(0.6)"
                        animate={false}
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
                        marginTop: margin.top,
                        marginBottom: margin.bottom
                    }}
                />
            </div>
        )
    }
}
