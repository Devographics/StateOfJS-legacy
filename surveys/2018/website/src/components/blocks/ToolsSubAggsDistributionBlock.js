import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ToolsSubAggsHeatMapChart from '../charts/ToolsSubAggsHeatMapChart'
import { getWording } from '../../helpers/wording'
import ChartContainer from '../elements/ChartContainer'

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
        const { sectionName, aggsType, formatValue, keys, data, chartId } = this.props

        return (
            <div className="block block--chart" id={chartId}>
                <BlockTitle chartId={chartId} values={{ sectionName }} />
                <ChartContainer>
                    <ToolsSubAggsHeatMapChart
                        keys={keys}
                        i18nNamespace={aggsType}
                        averageLabel={getWording(`tools_${aggsType}_average`)}
                        formatValue={formatValue}
                        data={data}
                    />
                </ChartContainer>
            </div>
        )
    }
}
