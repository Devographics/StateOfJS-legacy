import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from '../../nivoTheme'

const verticalMargin = 30
const innerMargin = 5
const barHeight = 26
const labelsWidth = 260
const labelsMargin = 14

export default class ReasonsChartUnit extends Component {
    static propTypes = {
        data: PropTypes.any.isRequired,
        color: PropTypes.string.isRequired
    }

    render() {
        const { data, color } = this.props

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
                    labelSkipWidth={36}
                    theme={theme}
                    colors={color}
                    data={data}
                    padding={0.8}
                    borderRadius={2.5}
                    keys={['count']}
                    indexBy="reason"
                    margin={{
                        top: verticalMargin,
                        right: labelsMargin + labelsWidth,
                        bottom: verticalMargin,
                        left: innerMargin
                    }}
                    axisTop={{}}
                    axisRight={{
                        tickSize: 0,
                        tickPadding: labelsMargin
                    }}
                    axisLeft={null}
                />
            </div>
        )
    }
}
