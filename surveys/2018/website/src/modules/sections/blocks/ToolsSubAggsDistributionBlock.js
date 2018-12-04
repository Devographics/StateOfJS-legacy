import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import ChartContainer from 'core/charts/ChartContainer'
import TransText from 'core/i18n/TransText'
import ToolsSubAggsHeatMapChart from '../charts/ToolsSubAggsHeatMapChart'

export default class ToolsSubAggsDistributionBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        aggsType: PropTypes.string.isRequired,
        formatValue: PropTypes.func,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                tool: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                average: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        const { aggsType, formatValue, keys, data, chartId } = this.props

        return (
            <Block id={chartId} className="block--chart">
                <ChartContainer>
                    <ToolsSubAggsHeatMapChart
                        keys={keys}
                        i18nNamespace={aggsType}
                        averageLabel={<TransText id={`tools_${aggsType}_average`} />}
                        formatValue={formatValue}
                        data={data}
                    />
                </ChartContainer>
            </Block>
        )
    }
}
