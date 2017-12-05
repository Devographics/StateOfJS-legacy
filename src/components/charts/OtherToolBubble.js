import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const OtherToolBubble = ({ tool, data }) => (
    <ResponsiveBubble
        root={{
            key: tool,
            children: data,
        }}
        margin={{
            top: 0,
            right: 40,
            bottom: 0,
            left: 40,
        }}
        identity="key"
        value="doc_count"
        leavesOnly={true}
        isZoomable={false}
        padding={3}
        borderWidth={1}
        borderColor="inherit:darker(0.6)"
        colors={colorRange}
        motionStiffness={90}
        motionDamping={11}
        theme={theme}
    />
)

OtherToolBubble.propTypes = {
    tool: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}

export default OtherToolBubble
