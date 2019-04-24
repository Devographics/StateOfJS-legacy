import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolPairingHeatMapChart from '../charts/ToolPairingHeatMapChart'

const ToolPairingBlock = ({ tool, data, chartId }) => {
    return (
        <Block id={chartId} className="ToolPairing__Block block">
            <ChartContainer>
                <ToolPairingHeatMapChart tool={tool} data={data} />
            </ChartContainer>
        </Block>
    )
}

ToolPairingBlock.propTypes = {
    tool: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            section: PropTypes.string.isRequired,
            tools: PropTypes.arrayOf(
                PropTypes.shape({
                    tool: PropTypes.string.isRequired,
                    score: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolPairingBlock
