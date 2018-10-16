import React, { Component } from 'react'
import { reasons } from '../../constants'
import theme from '../../nivoTheme'
import BlockTitle from '../elements/BlockTitle'
import ReasonsChartUnit from './ReasonsChartUnit'

export default class ReasonsChart extends Component {
    render() {
        const { tool } = this.props
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
                <div className="block">
                    <BlockTitle chart="likes" tool={tool} />
                    <ReasonsChartUnit data={likeData} color={theme.reasonsColors.like} />
                </div>
                <div className="block">
                    <BlockTitle chart="dislikes" tool={tool} />
                    <ReasonsChartUnit data={dislikeData} color={theme.reasonsColors.dislike} />
                </div>
            </div>
        )
    }
}
