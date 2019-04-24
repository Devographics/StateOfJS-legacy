import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'

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
            <Block id={this.props.chartId} showDescription={false}>
                <ChartContainer>
                    <ParticipationByCountryMapChart data={this.props.data} />
                </ChartContainer>
            </Block>
        )
    }
}
