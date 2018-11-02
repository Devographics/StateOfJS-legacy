import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import ParticipationBreakdownMap from '../charts/ParticipationBreakdownMap'

export default class ParticipationBreakdownBlock extends Component {
    render() {
        return (
            <div className="block">
                <BlockTitle chart="participation-breakdown" />
                <ParticipationBreakdownMap />
            </div>
        )
    }
}
