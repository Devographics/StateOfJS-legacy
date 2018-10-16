import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toolOpinionKeys } from '../../constants'
import theme from '../../nivoTheme'
import wording from '../../data/wording.yml'
import Legends from './Legends'

const colors = [...theme.opinionColors].reverse()

export default class OpinionsLegends extends Component {
    static propTypes = {
        useShortLabels: PropTypes.bool.isRequired
    }

    static defaultProps = {
        useShortLabels: true
    }

    render() {
        const { useShortLabels, ...rest } = this.props

        const labels = useShortLabels ? wording.opinions.legends_short : wording.opinions.legends
        const legends = toolOpinionKeys.map((id, i) => ({
            id,
            label: labels[id],
            color: colors[i]
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
                {...rest}
            />
        )
    }
}
