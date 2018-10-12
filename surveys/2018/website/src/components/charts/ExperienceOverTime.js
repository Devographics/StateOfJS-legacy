import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from '../../nivoTheme'

const colors = [...theme.experienceColors]

export default class ExperienceOverTime extends Component {
    render() {
        return (
            <div
                style={{
                    height: 280,
                }}
            >
                <ResponsiveStream
                    theme={theme}
                    offsetType="expand"
                    colors={colors}
                    curve="linear"
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 40,
                    }}
                    keys={[
                        'would_use',
                        'would_not_use',
                        'interested',
                        'not_interested',
                        'never_heard',
                    ]}
                    enableGridX={false}
                    enableGridY={false}
                    data={this.props.experience.map(xp => ({
                        id: xp.survey,
                        ...xp,
                    }))}
                    axisLeft={{
                        format: v => `${v * 100}%`
                    }}
                    axisBottom={{
                        format: i => this.props.experience[i].survey
                    }}
                />
            </div>
        )
    }
}
