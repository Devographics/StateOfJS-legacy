import React, { Component } from 'react'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolUsageByCountryMapChart from '../charts/ToolUsageByCountryMapChart'

export default class ToolUsageByCountryBlock extends Component {
    render() {
        const { tool, data, chartId } = this.props

        return (
            <Block
                id={chartId}
                values={{ percentage: data.percentage }}
                className="ToolUsageByCountry__Block"
            >
                <ChartContainer height={'auto'}>
                    <ToolUsageByCountryMapChart
                        chartId={chartId}
                        data={data}
                        tool={tool}
                        average={data.percentage}
                    />
                </ChartContainer>
            </Block>
        )
    }
}
