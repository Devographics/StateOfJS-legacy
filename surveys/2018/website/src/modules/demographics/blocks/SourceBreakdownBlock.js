import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import SourceBreakdownWaffleChart from '../charts/SourceBreakdownWaffleChart'

export default class SourceBreakdownBlock extends Component {
    static propTypes = {
        data: PropTypes.shape({
            survey: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            by_source: PropTypes.arrayOf(
                PropTypes.shape({
                    source: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        }),
        chartId: PropTypes.string.isRequired
    }

    render() {
        const { data, chartId } = this.props
        console.log(data)
        return (
            <Block id={chartId} showDescription={false} className="Block--source Source__Block">
                <SourceBreakdownWaffleChart total={data.total} data={data.by_source} />
            </Block>
        )
    }
}
