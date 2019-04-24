import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import SalaryPerCountryMapChart from '../charts/SalaryPerCountryMapChart'

export default class SalaryPerCountryBlock extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                country: PropTypes.string.isRequired,
                salary: PropTypes.shape({
                    average: PropTypes.number.isRequired
                }).isRequired
            })
        ).isRequired,
        chartId: PropTypes.string.isRequired
    }

    render() {
        return (
            <Block id={this.props.chartId} showDescription={false}>
                <ChartContainer>
                    <SalaryPerCountryMapChart data={this.props.data} />
                </ChartContainer>
            </Block>
        )
    }
}
