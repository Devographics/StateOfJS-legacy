import React, { Component } from 'react'
import OpinionsSelector from '../elements/OpinionsSelector'
import ToolOpinionMapChart from '../charts/ToolOpinionMapChart'
import getWording from '../../helpers/getWording'

export default class ToolOpinionMapBlock extends Component {
    render() {
        const { tool, data } = this.props

        return (
            <div className="block">
                <h3 className="block__title">{getWording('charts', 'tool-map', { tool })}</h3>
                <div className="block block--text">
                    Percentage of developers who <OpinionsSelector /> <strong>{tool}</strong> for
                    each continent.
                </div>
                <ToolOpinionMapChart data={data} />
            </div>
        )
    }
}
