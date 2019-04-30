import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import GenderBreakdownWaffleChart from '../charts/GenderBreakdownWaffleChart'

export default class GenderBreakdownBlock extends Component {
    static propTypes = {
        data: PropTypes.shape({
            survey: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            by_gender: PropTypes.arrayOf(
                PropTypes.shape({
                    gender: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        }),
        block: PropTypes.object.isRequired
    }

    render() {
        const { data, block } = this.props
        const yearData = data.stats.gender && data.stats.gender.find(d => d.survey === '2018')

        return (
            <Block id={block.id} showDescription={false} className="Block--gender Gender__Block">
                <GenderBreakdownWaffleChart total={data.total} data={yearData.by_gender} />
            </Block>
        )
    }
}
