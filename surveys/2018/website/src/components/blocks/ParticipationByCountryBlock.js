import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'
import ChartContainer from '../elements/ChartContainer';

export default class ParticipationByCountryBlock extends Component {
    render() {
        return (
            <div className="block">
                <BlockTitle chart="participation-by-country" />
                <ChartContainer>
                    <ParticipationByCountryMapChart data={this.props.data} />
                </ChartContainer>
            </div>
        )
    }
}
