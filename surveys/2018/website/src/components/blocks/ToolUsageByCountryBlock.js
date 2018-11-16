import React, { Component } from 'react'
import BlockTitle from '../elements/BlockTitle'
import { getToolName } from '../../helpers/wording'
import ToolUsageByCountryMapChart from '../charts/ToolUsageByCountryMapChart'
import ChartContainer from '../elements/ChartContainer'

export default class ToolUsageByCountryBlock extends Component {
    render() {
        const { tool, data, chartId } = this.props

        return (
            <div className="ToolUsageByCountry__Block block" id={chartId}>
                <BlockTitle chartId={chartId} values={{ tool: getToolName(tool) }} />
                <div className="block block--text">
                    On average, <strong>{data.percentage}%</strong> of respondents have used{' '}
                    <strong>{getToolName(tool)}</strong> and would be happy to use it again.
                    Countries where this ratio is higher are shown in red, those where it's lower
                    are displayed in blue (countries with fewer than 20 total survey respondents are
                    omitted).
                </div>
                <ChartContainer height={'auto'}>
                    <ToolUsageByCountryMapChart
                        chartId={chartId}
                        data={data}
                        tool={tool}
                        average={data.percentage}
                    />
                </ChartContainer>
            </div>
        )
    }
}
