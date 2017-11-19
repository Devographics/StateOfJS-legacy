import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from 'nivo'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const BubbleNode = ({ node, style, handlers }) => {
    if (style.r <= 0) return null

    const className =
        node.r < 10
            ? 'xsmall'
            : node.r < 20 ? 'small' : node.r < 50 ? 'medium' : node.r < 100 ? 'large' : 'xlarge'

    const nodeHandlers = node.depth === 0 ? {} : handlers

    return (
        <g transform={`translate(${style.x},${style.y})`} className={className}>
            <circle
                r={style.r}
                {...nodeHandlers}
                fill={style.fill ? style.fill : style.color}
                stroke={style.borderColor}
                strokeWidth={style.borderWidth}
            />
            {node.label !== false && (
                <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    style={{
                        fill: style.labelTextColor,
                        pointerEvents: 'none',
                    }}
                >
                    {node.label}
                </text>
            )}
        </g>
    )
}

const OthersBubble = ({ data, baseKeys }) => (
    <ResponsiveBubble
        root={{
            key: 'tools',
            children: data,
        }}
        margin={{
            top: 0,
            right: 80,
            bottom: 0,
            left: 80,
        }}
        identity="key"
        value="doc_count"
        isZoomable={false}
        padding={3}
        borderWidth={1}
        borderColor="inherit:darker(0.6)"
        colorBy={({ key }) => {
            if (key === 'tools') return '#F4F6F4'
            if (baseKeys.includes(key)) return colorRange[3]
            return colorRange[2]
        }}
        labelSkipRadius={9}
        motionStiffness={90}
        motionDamping={11}
        theme={theme}
        nodeComponent={BubbleNode}
    />
)

OthersBubble.propTypes = {
    data: PropTypes.array.isRequired,
    baseKeys: PropTypes.array.isRequired,
}

export default OthersBubble
