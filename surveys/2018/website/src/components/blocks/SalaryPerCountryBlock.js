import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import SalaryPerCountryMap from '../charts/SalaryPerCountryMap'

export default class SalaryPerCountryBlock extends Component {
    render() {
        return (
            <div className="block">
                <BlockTitle chart="salary-per-country" />
                <SalaryPerCountryMap />
            </div>
        )
    }
}
