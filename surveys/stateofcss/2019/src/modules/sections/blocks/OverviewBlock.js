import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import OverviewChart from '../charts/OverviewChart'

export default class OverviewBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    render() {
        const { chartId, section, opinions } = this.props

        return (
            <Block id={chartId} className="Overview__Block">
                <OverviewChart section={section} opinions={opinions} />
            </Block>
        )
    }
}
