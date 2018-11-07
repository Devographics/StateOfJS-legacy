import React from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ToolPairingHeatMapChart from '../charts/ToolPairingHeatMapChart'

const ToolPairingBlock = ({ tool, data }) => {
    return (
        <div className="ToolPairing__Block block">
            <BlockTitle chart="tool-pairing" tool={tool} />
            <ToolPairingHeatMapChart tool={tool} data={data} />
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
