import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toolOpinionKeys } from '../../constants'
import theme from '../../nivoTheme'
import { getWording } from '../../helpers/wording'
import Legends from './Legends'

export default class OpinionsLegends extends Component {
    static propTypes = {
        useShortLabels: PropTypes.bool.isRequired
    }

    static defaultProps = {
        useShortLabels: true
    }

    render() {
        const { useShortLabels, ...rest } = this.props

        const legends = toolOpinionKeys
            .map(id => ({
                id,
                label: getWording(
                    useShortLabels === true
                        ? `opinions.legends_short.${id}`
                        : `opinions.legends.${id}`
                ),
                color: theme.opinionColors[id]
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
                {...rest}
            />
        )
    }
}
