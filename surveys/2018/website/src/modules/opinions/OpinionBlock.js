import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import Trans from 'core/i18n/Trans'
import OpinionOverTimeChart from './OpinionOverTimeChart'

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

        return (
            <Trans>
                {translate => {
                    const chartData = data.map(d => {
                        return d.by_choice.reduce(
                            (acc, choice) => ({
                                ...acc,
                                [translate(`opinion_scale.${choice.choice}`)]: choice.percentage
                            }),
                            { survey: d.survey }
                        )
                    })

                    return (
                        <Block id={chartId} showDescription={false}>
                            <OpinionOverTimeChart data={chartData} />
                        </Block>
                    )
                }}
            </Trans>
        )
    }
}
