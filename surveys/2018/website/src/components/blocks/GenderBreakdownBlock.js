import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getWording } from '../../helpers/wording'
import TextBlock from './TextBlock'
import GenderBreakdownWaffleChart from '../charts/GenderBreakdownWaffleChart'

const introText = `
This chart shows the gender people selected.
`

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
            <div className="block" id="gender-breakdown">
                <h3 className="block__title">{getWording('charts.gender')}</h3>
                <TextBlock text={introText} />
                <GenderBreakdownWaffleChart total={data.total} data={data.by_gender} />
            </div>
        )
    }
}
