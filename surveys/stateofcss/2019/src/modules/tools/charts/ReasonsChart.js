import React, { Component } from 'react'
import { reasons } from '../../../constants'
import theme from 'nivoTheme'
import Block from 'core/components/Block'
import ReasonsChartUnit from './ReasonsChartUnit'

export default class ReasonsChart extends Component {
    getData = () => {
        const { like, dislike } = this.props.reasons

        const dislikeData = reasons.dislike
            .map(reason => {
                const match = dislike.find(r => r.id === reason)

                return {
                    id: reason,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        const likeData = reasons.like
            .map(reason => {
                const match = like.find(r => r.id === reason)

                return {
                    id: reason,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        return { likeData, dislikeData }
    }

    render() {
        const { chartIdLikes, chartIdDislikes } = this.props
        const { likeData, dislikeData } = this.getData()

        return (
            <>
                {likeData.length > 0 && (
                    <Block id={chartIdLikes} className="Block--likes">
                        <ReasonsChartUnit data={likeData} color={theme.reasonsColors.like} />
                        <ReasonsChartUnit
                            data={likeData}
                            color={theme.reasonsColors.like}
                            variant="mobile"
                        />
                    </Block>
                )}
                {dislikeData.length > 0 && (
                    <Block id={chartIdDislikes} className="Block--dislikes">
                        <ReasonsChartUnit data={dislikeData} color={theme.reasonsColors.dislike} />
                        <ReasonsChartUnit
                            data={dislikeData}
                            color={theme.reasonsColors.dislike}
                            variant="mobile"
                        />
                    </Block>
                )}
            </>
        )
    }
}
