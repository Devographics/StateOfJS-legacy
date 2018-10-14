import React, { Component } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { reasons } from '../../constants'
import theme from '../../nivoTheme'

const verticalMargin = 30
const innerMargin = 5
const barHeight = 26
const labelsWidth = 260
const labelsMargin = 14

export default class ReasonsChart extends Component {
    render() {
        const { like, dislike } = this.props.reasons

        const dislikeData = reasons.dislike
            .map(reason => {
                const match = dislike.find(r => r.id === reason.id)

                return {
                    reason: reason.label,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        const likeData = reasons.like
            .map(reason => {
                const match = like.find(r => r.id === reason.id)

                return {
                    reason: reason.label,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        return (
            <div>
                <h4>what people liked about it</h4>
                <div
                    style={{
                        height: likeData.length * barHeight + verticalMargin * 2,
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
                        colors={theme.reasonsColors.like}
                        data={likeData}
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
                <h4>what people disliked about it</h4>
                <div style={{ height: dislikeData.length * barHeight + verticalMargin * 2 }}>
                    <ResponsiveBar
                        layout="horizontal"
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={false}
                        labelSkipWidth={36}
                        theme={theme}
                        colors={theme.reasonsColors.dislike}
                        data={dislikeData}
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
                        axisLeft={null}
                        axisRight={{
                            tickSize: 0,
                            tickPadding: labelsMargin
                        }}
                    />
                </div>
            </div>
        )
    }
}
