import React, { Component } from 'react'
import ExperienceOverTimeChart from '../charts/ExperienceOverTimeChart'

export default class ExperienceOverTimeBlock extends Component {
    render() {
        return (
            <div className="block">
                <h3 className="block__title">Results over time</h3>
                <ExperienceOverTimeChart experience={this.props.experience.by_survey} />
            </div>
        )
    }
}
