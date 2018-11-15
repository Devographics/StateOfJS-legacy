import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OverviewChart from '../charts/OverviewChart'
import BlockTitle from '../elements/BlockTitle'

const chartId = 'overview'

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
        return (
            <div className="Overview__Block block" id={chartId}>
                <BlockTitle chartId={chartId} />
                <div className="Overview__Block__Description block__description">
                    <p>Per-library survey results.</p>
                </div>
                <OverviewChart section={this.props.section} opinions={this.props.opinions} />
            </div>
        )
    }
}
