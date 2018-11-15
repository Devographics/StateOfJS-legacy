import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getWording } from '../../helpers/wording'
import GenderBreakdownWaffleChart from '../charts/GenderBreakdownWaffleChart'
import BlockTitle from '../elements/BlockTitle'

const chartId = 'gender-breakdown'

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
        })
    }

    render() {
        const { data } = this.props

        return (
            <div className="Block Block--gender Gender__Block" id={chartId}>
                <BlockTitle chartId={chartId} />
                <GenderBreakdownWaffleChart total={data.total} data={data.by_gender} />
            </div>
        )
    }
}
