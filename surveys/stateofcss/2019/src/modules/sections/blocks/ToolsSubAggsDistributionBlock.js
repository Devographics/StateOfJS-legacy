import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import { I18nContext } from 'core/i18n/i18nContext'
import ToolsSubAggsHeatMapChart from '../charts/ToolsSubAggsHeatMapChart'

const ToolsSubAggsDistributionBlock = ({ aggsType, formatValue, keys, data, chartId }) => {
    const { translate } = useContext(I18nContext)

    return (
        <Block id={chartId} className="block--chart">
            <ChartContainer>
                <ToolsSubAggsHeatMapChart
                    keys={keys}
                    i18nNamespace={aggsType}
                    averageLabel={translate(`tools_${aggsType}_average`)}
                    formatValue={formatValue}
                    data={data}
                />
            </ChartContainer>
        </Block>
    )
}

ToolsSubAggsDistributionBlock.propTypes = {
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

export default ToolsSubAggsDistributionBlock
