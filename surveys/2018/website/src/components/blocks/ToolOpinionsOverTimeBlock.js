import React, { Component } from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'

export default class ToolOpinionsOverTimeBlock extends Component {
    render() {
        return (
            <div className="block">
                <h3 className="block__title">Results over time</h3>
                <ToolOpinionsOverTimeChart opinions={this.props.opinions.by_survey} />
            </div>
        )
    }
}
