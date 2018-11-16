import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import OpinionOverTimeChart from '../charts/OpinionOverTimeChart'
import { getWording } from '../../helpers/wording'

export default class OpinionBlock extends Component {
    static propTypes = {
        subject: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                by_choice: PropTypes.arrayOf(
                    PropTypes.shape({
                        choice: PropTypes.number.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired,
        chartId: PropTypes.string.isRequired
    }

    render() {
        const { data, chartId } = this.props

        const chartData = data.map(d => {
            return d.by_choice.reduce(
                (acc, choice) => ({
                    ...acc,
                    [getWording(`opinion_scale.${choice.choice}`)]: choice.percentage
                }),
                { survey: d.survey }
            )
        })

        return (
            <div className="block" id={chartId}>
                <BlockTitle chartId={chartId} />
                <OpinionOverTimeChart data={chartData} />
            </div>
        )
    }
}
