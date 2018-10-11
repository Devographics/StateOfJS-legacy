import React, { Component } from 'react'
import Chart from '../charts/ExperienceOverTime'

export default class ExperienceOverTime extends Component {
    render() {
        return (
            <div className="block">
                <h3 className="block__title">Results over time</h3>
                <Chart/>
            </div>
        )
    }
}
