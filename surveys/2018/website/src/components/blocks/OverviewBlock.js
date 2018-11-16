import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OverviewChart from '../charts/OverviewChart'
import BlockTitle from '../elements/BlockTitle'

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
        const { chartId, section, opinions, sectionName } = this.props
        return (
            <div className="Overview__Block block" id={chartId}>
                <BlockTitle chartId={chartId} values={{ sectionName }} />
                <div className="Overview__Block__Description block__description">
                    <p>Per-library survey results.</p>
                </div>
                <OverviewChart section={section} opinions={opinions} />
            </div>
        )
    }
}
