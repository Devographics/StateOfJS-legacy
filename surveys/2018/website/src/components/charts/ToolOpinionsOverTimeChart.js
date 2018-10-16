import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from '../../nivoTheme'

export default class ToolOpinionsOverTimeChart extends Component {
    render() {
        return (
            <div
                style={{
                    height: 280
                }}
            >
                <ResponsiveStream
                    theme={theme}
                    offsetType="expand"
                    colors={theme.opinionColors}
                    curve="monotoneX"
                    margin={{
                        top: 10,
                        right: 20,
                        bottom: 40,
                        left: 40
                    }}
                    keys={[
                        'would_use',
                        'would_not_use',
                        'interested',
                        'not_interested',
                        'never_heard'
                    ]}
                    data={this.props.opinions.map(xp => ({
                        id: xp.survey,
                        ...xp
                    }))}
                    enableGridX={false}
                    enableGridY={false}
                    axisLeft={{
                        format: v => `${v * 100}%`,
                        tickValues: [0, 0.25, 0.5, 0.75, 1]
                    }}
                    axisBottom={{
                        format: i => this.props.opinions[i].survey
                    }}
                    defs={[
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(0, 0, 0, .07)',
                            rotation: -45,
                            lineWidth: 3,
                            spacing: 6
                        }
                    ]}
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
        )
    }
}
