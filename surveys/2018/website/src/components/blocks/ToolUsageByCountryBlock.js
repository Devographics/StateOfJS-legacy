import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import ToolUsageByCountryMapChart from '../charts/ToolUsageByCountryMapChart'

export default class ToolUsageByCountryBlock extends Component {
    render() {
        const { tool, data } = this.props

        return (
            <div className="block">
                <BlockTitle chart="tool-usage-by-country" tool={tool} />
                <div className="block block--text">
                    For an average of <strong>{data.percentage}%</strong> of developers who used{' '}
                    <strong>{tool}</strong> and would use it again, this map shows the delta from
                    this average for each country where at least 10 persons took the survey.
                </div>
                <ToolUsageByCountryMapChart data={data} />
            </div>
        )
    }
}
