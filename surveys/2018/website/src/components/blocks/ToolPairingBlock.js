import React from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ToolPairingHeatMapChart from '../charts/ToolPairingHeatMapChart'
import ChartContainer from '../elements/ChartContainer'

const ToolPairingBlock = (props) => {
    const {tool, projects} = props
    return (
        <div className="ToolPairing__Block block">
            <BlockTitle chart="tool-pairing" tool={tool} projects={projects} />
            <ChartContainer>
                <ToolPairingHeatMapChart {...props} />
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
