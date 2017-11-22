import React from 'react'
import PropTypes from 'prop-types'


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

export default BubbleNode