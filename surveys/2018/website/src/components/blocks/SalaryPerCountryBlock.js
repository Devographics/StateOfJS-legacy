import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import SalaryPerCountryMap from '../charts/SalaryPerCountryMap'
import ChartContainer from '../elements/ChartContainer'

export default class SalaryPerCountryBlock extends Component {
    render() {
        return (
            <div className="block">
                <BlockTitle chart="salary-per-country" />
                <ChartContainer>
                    <SalaryPerCountryMap />
                </ChartContainer>
            </div>
        )
    }
}
