import React, { Component } from 'react'
import theme from '../../nivoTheme'
import { getWording } from '../../helpers/wording'
import Legends from './Legends'

export default class OpinionScaleLegends extends Component {
    render() {
        const legends = [0, 1, 2, 3, 4]
            .map(id => ({
                id,
                label: getWording(`opinion_scale.${id}`),
                color: theme.opinionScaleColors[id]
            }))
            .reverse()

        return (
            <Legends
                legends={legends}
                itemStyle={{
                    padding: '3px 5px'
                }}
                chipStyle={{
                    borderRadius: '1px'
                }}
                {...this.props}
            />
        )
    }
}
