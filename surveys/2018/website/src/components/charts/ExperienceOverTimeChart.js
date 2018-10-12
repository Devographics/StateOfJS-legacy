import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from '../../nivoTheme'

const colors = [...theme.experienceColors]

export default class ExperienceOverTimeChart extends Component {
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
                    colors={colors}
                    curve="monotoneX"
                    margin={{
                        top: 20,
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
                    data={this.props.experience.map(xp => ({
                        id: xp.survey,
                        ...xp
                    }))}
                    enableGridX={false}
                    enableGridY={false}
                    axisLeft={{
                        format: v => `${v * 100}%`
                    }}
                    axisBottom={{
                        format: i => this.props.experience[i].survey
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
