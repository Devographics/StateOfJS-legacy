import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
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
        const { data, block } = this.props
        const yearData = data.stats.source && data.stats.source.find(d => d.survey === '2018')

        return (
            <Block id={block.id} showDescription={false} className="Block--source Source__Block">
                <SourceBreakdownWaffleChart total={yearData.total} data={yearData.by_source} />
            </Block>
        )
    }
}
