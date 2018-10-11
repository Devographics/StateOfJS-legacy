import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'

export default class ExperienceOverTime extends Component {
    render() {
        return (
            <div
                style={{
                    height: 400,
                }}
            >
                <ResponsiveStream
                    //theme={theme}
                    offsetType="expand"
                    //colors={theme.salaryColors}
                    curve="monotoneX"
                    margin={{
                        top: 60,
                        right: 100,
                        bottom: 60,
                        left: 100,
                    }}
                    keys={[
                        'would_use',
                        'would_not_use',
                        'interested',
                        'not_interested',
                        'never_heard',
                    ]}
                    data={[
                        {
                            would_use: 1,
                            would_not_use: 0,
                            interested: .7,
                            not_interested: 2,
                            never_heard: .2,
                        },
                        {
                            would_use: 2,
                            would_not_use: 1,
                            interested: .9,
                            not_interested: .2,
                            never_heard: 1.3,
                        },
                        {
                            would_use: 1.5,
                            would_not_use: 1.2,
                            interested: .2,
                            not_interested: 1.3,
                            never_heard: .1,
                        }
                    ]}
                    /*
                    axisTop={{
                        format: i => `${'$'}${normData[Number(i)].average},000`,
                    }}
                    axisBottom={{
                        format: i => normData[Number(i)].id,
                    }}
                    */
                />
            </div>
        )
    }
}
