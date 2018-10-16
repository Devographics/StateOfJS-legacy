import React, { Component } from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import OpinionsLegends from '../elements/OpinionsLegends'

export default class ToolOpinionsOverTimeBlock extends Component {
    render() {
        return (
            <div className="block">
                <h3 className="block__title">Results over time</h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 250px',
                        gridColumnGap: 20
                    }}
                >
                    <ToolOpinionsOverTimeChart opinions={this.props.opinions.by_survey} />
                    <OpinionsLegends
                        layout="vertical"
                        style={{
                            marginTop: 10,
                            marginBottom: 40
                        }}
                    />
                </div>
            </div>
        )
    }
}
