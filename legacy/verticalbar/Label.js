import React from 'react'
import classNames from 'classnames'

const Label = props => {
    const { highlight, key, value, x, y } = props
    return (
        <g key={key} className="recharts-cartesian-axis-label">
            <text
                className={classNames('label', { 'label-highlighted': highlight === value })}
                x={x}
                y={y}
                textAnchor="start"
            >
                {value}
            </text>
        </g>
    )
}

Label.propTypes = {
    key: React.PropTypes.string,
    index: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.any,
    highlight: React.PropTypes.any,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
}

export default Label
