import React, { Component } from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'
import Trans from 'core/i18n/Trans'

// note: legend is rendered in opposite order as chart
const getReverseIndex = (keys, index) => keys.length - 1 - index

export default class OpinionScaleLegends extends Component {
    render() {
        return (
            <Trans>
                {translate => {
                    const legends = this.props.keys.map(id => ({
                        id,
                        label: translate(`opinion_scale.${getReverseIndex(this.props.keys, id)}`),
                        color: theme.opinionScaleColors[id]
                    }))

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
                }}
            </Trans>
        )
    }
}
