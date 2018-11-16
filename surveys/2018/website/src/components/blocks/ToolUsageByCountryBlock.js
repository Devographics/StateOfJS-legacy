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
                <BlockTitle
                    chartId={chartId}
                    values={{ percentage: data.percentage, tool: getToolName(tool) }}
                />
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
