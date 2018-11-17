import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'
import ChartContainer from '../elements/ChartContainer'

export default class ParticipationByCountryBlock extends Component {
    static propTypes = {
        // data: PropTypes.shape({
        //     survey: PropTypes.string.isRequired,
        //     total: PropTypes.number.isRequired,
        //     by_gender: PropTypes.arrayOf(
        //         PropTypes.shape({
        //             gender: PropTypes.string.isRequired,
        //             count: PropTypes.number.isRequired,
        //             percentage: PropTypes.number.isRequired
        //         })
        //     ).isRequired
        // }),
        chartId: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="block" id={this.props.chartId}>
                <BlockTitle chartId={this.props.chartId} />
                <ChartContainer>
                    <ParticipationByCountryMapChart data={this.props.data} />
                </ChartContainer>
            </div>
        )
    }
}
