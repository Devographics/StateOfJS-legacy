import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'
import ChartContainer from '../elements/ChartContainer'

const chartId = 'participation-by-country'

export default class ParticipationByCountryBlock extends Component {
    render() {
        return (
            <div className="block" id={chartId}>
                <BlockTitle chartId={chartId} />
                <ChartContainer>
                    <ParticipationByCountryMapChart data={this.props.data} />
                </ChartContainer>
            </div>
        )
    }
}
