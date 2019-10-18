/* eslint-disable react/display-name */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { barChartProps } from '../../../constants'
import Trans from 'core/i18n/Trans'

const verticalMargin = 30
const barHeight = 30
const fullLabelsWidth = 400
const shortLabelsWidth = 180

class ReasonLabel extends Component {
    handleMouseEnter = () => {
        const { onMouseEnter, value } = this.props
        onMouseEnter(value)
    }

    handleMouseLeave = () => {
        this.props.onMouseLeave()
    }

    render() {
        const { y, value, translate, current, isMobile = false, labelsWidth } = this.props

        let textColor = '#e8e8e8'
        if (current !== null && current !== value) {
            textColor = '#666'
        }
        const fontSize = isMobile ? 12 : 14

        return (
            <g transform={`translate(${-labelsWidth},${y})`}>
                <text fill={textColor} style={{ fontSize }} alignmentBaseline="middle">
                    {translate(`reason.${value}.${isMobile ? 'short' : 'long'}`)}
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

const Tooltip = translate => ({ indexValue, value }) => (
    <span>
        {translate(`reason.${indexValue}.short`)}
        :&nbsp;
        <strong>{value}</strong>
    </span>
)

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

    isMobile = () => this.props.variant === 'mobile'

    render() {
        const { data, color } = this.props
        const { current } = this.state
        const labelsWidth = this.isMobile() ? shortLabelsWidth : fullLabelsWidth

        return (
            <Trans>
                {translate => (
                    <div
                        className={`
                                Reasons__Chart__Unit
                                ${
                                    this.isMobile()
                                        ? 'Reasons__Chart__Unit--mobile'
                                        : 'Reasons__Chart__Unit--desktop'
                                }`}
                        style={{
                            height: data.length * barHeight + verticalMargin * 2,
                            marginBottom: 30
                        }}
                    >
                        <ResponsiveBar
                            {...barChartProps}
                            theme={theme}
                            colorBy={d => {
                                if (current === null) return color
                                return d.indexValue === current ? color : 'rgba(255, 255, 255, .15)'
                            }}
                            data={data}
                            keys={['count']}
                            indexBy="id"
                            margin={{
                                ...barChartProps.margin,
                                left: labelsWidth
                            }}
                            tooltip={Tooltip(translate)}
                            axisLeft={{
                                tickSize: 0,
                                tickPadding: 0,
                                renderTick: d => (
                                    <ReasonLabel
                                        {...d}
                                        translate={translate}
                                        current={current}
                                        onMouseEnter={this.setCurrent}
                                        onMouseLeave={this.resetCurrent}
                                        isMobile={this.isMobile()}
                                        labelsWidth={labelsWidth}
                                    />
                                )
                            }}
                        />
                    </div>
                )}
            </Trans>
        )
    }
}
