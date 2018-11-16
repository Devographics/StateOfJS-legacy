import React from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ToolPairingHeatMapChart from '../charts/ToolPairingHeatMapChart'
import ChartContainer from '../elements/ChartContainer'
import { getToolName } from '../../helpers/wording'

const ToolPairingBlock = ({ tool, data, chartId }) => {
    return (
        <div className="ToolPairing__Block block" id={chartId}>
            <BlockTitle chartId={chartId} values={{ tool: getToolName(tool) }} />
            <ChartContainer>
                <ToolPairingHeatMapChart tool={tool} data={data} />
            </ChartContainer>
        </div>
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
