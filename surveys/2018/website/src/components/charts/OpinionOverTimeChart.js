import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveStream } from '@nivo/stream'
import theme from '../../nivoTheme'
import { getWording } from '../../helpers/wording'
import OpinionScaleLegends from '../elements/OpinionScaleLegends'

const margin = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 20
}

export default class OpinionOverTimeChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
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

    getLayerColor = keyIndex => {
        const { current } = this.state

        if (current !== null && current !== keyIndex) {
            return `${theme.opinionScaleColors[keyIndex]}33`
        }

        return theme.opinionScaleColors[keyIndex]
    }

    render() {
        const { data } = this.props

        const horizontalAxis = {
            tickSize: 10,
            tickPadding: 6,
            format: i => data[i].survey
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
                        keys={[0, 1, 2, 3, 4].map(k => getWording(`opinion_scale.${k}`))}
                        data={data}
                        enableGridX={false}
                        enableGridY={false}
                        axisLeft={undefined}
                        axisTop={horizontalAxis}
                        axisBottom={horizontalAxis}
                        dotColor="inherit:brighter(0.6)"
                        animate={false}
                    />
                </div>
                <OpinionScaleLegends
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
