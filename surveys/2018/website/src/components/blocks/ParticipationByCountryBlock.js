import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'

export default class ParticipationByCountryBlock extends Component {
    render() {
        return (
            <div className="block">
                <BlockTitle chart="participation-by-country" />
                <ParticipationByCountryMapChart data={this.props.data} />
            </div>
        )
    }
}
