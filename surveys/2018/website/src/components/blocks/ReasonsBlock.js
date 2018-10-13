import React, { Component } from 'react'
import ReasonsChart from '../charts/ReasonsChart'

export default class ReasonsBlock extends Component {
    render() {
        return (
            <div className="block">
                <h3 className="block__title">Reasons behind like/dislike</h3>
                <ReasonsChart reasons={this.props.reasons} />
            </div>
        )
    }
}
