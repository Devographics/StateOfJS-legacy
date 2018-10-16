import React, { Component } from 'react'
import OpinionsSelector from '../elements/OpinionsSelector'
import BlockTitle from '../elements/BlockTitle'
import ToolOpinionMapChart from '../charts/ToolOpinionMapChart'

export default class ToolOpinionMapBlock extends Component {
    render() {
        const { tool, data } = this.props

        return (
            <div className="block">
                <BlockTitle chart="tool-map" tool={tool}/>
                <div className="block block--text">
                    Percentage of developers who <OpinionsSelector /> <strong>{tool}</strong> for
                    each continent.
                </div>
                <ToolOpinionMapChart data={data} />
            </div>
        )
    }
}
