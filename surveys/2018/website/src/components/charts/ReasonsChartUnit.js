import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from '../../nivoTheme'

const verticalMargin = 30
const innerMargin = 10
const barHeight = 30
const labelsWidth = 290

class ReasonLabel extends Component {
    handleMouseEnter = () => {
        const { onMouseEnter, value } = this.props
        onMouseEnter(value)
    }

    handleMouseLeave = () => {
        this.props.onMouseLeave()
    }

    render() {
        const { y, value, current } = this.props

        let textColor = '#e8e8e8'
        if (current !== null && current !== value) {
            textColor = '#666'
        }

        return (
            <g transform={`translate(${-labelsWidth},${y})`}>
                <text fill={textColor} style={{ fontSize: 14 }} alignmentBaseline="middle">
                    {value}
                </text>
                <rect
                    y={barHeight * -0.5}
                    width={labelsWidth}
                    height={barHeight}
                    opacity={0}
                    style={{
                        cursor: 'pointer'
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
            </g>
        )
    }
}

export default class ReasonsChartUnit extends Component {
    static propTypes = {
        data: PropTypes.any.isRequired,
        color: PropTypes.string.isRequired
    }

    state = {
        current: null
    }

    setCurrent = current => {
        this.setState({ current })
    }

    resetCurrent = () => {
        this.setState({ current: null })
    }

    render() {
        const { data, color } = this.props
        const { current } = this.state

        return (
            <div
                style={{
                    height: data.length * barHeight + verticalMargin * 2,
                    marginBottom: 30
                }}
            >
                <ResponsiveBar
                    layout="horizontal"
                    enableGridX={true}
                    enableGridY={false}
                    enableLabel={false}
                    reverse={false}
                    enableLabels={false}
                    theme={theme}
                    colorBy={d => {
                        if (current === null) return color
                        return d.indexValue === current ? color : 'rgba(255, 255, 255, .15)'
                    }}
                    data={data}
                    padding={0.8}
                    borderRadius={2.5}
                    keys={['count']}
                    indexBy="reason"
                    margin={{
                        top: verticalMargin,
                        right: innerMargin,
                        bottom: verticalMargin,
                        left: labelsWidth
                    }}
                    axisTop={{}}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 0,
                        renderTick: d => (
                            <ReasonLabel
                                {...d}
                                current={current}
                                onMouseEnter={this.setCurrent}
                                onMouseLeave={this.resetCurrent}
                            />
                        )
                    }}
                />
            </div>
        )
    }
}
