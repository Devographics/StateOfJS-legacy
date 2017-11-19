import React from 'react'
import classNames from 'classnames'

const Label = props => {
    const { highlight, key, value, x, y, showPercent, total, textAnchor = 'middle' } = props

    const label = showPercent ? `${Math.round(value * 100 / total)}%` : value

    return (
        <text
            className={classNames('label', { 'label-highlighted': highlight === value })}
            x={x}
            y={y}
            textAnchor={textAnchor}
        >
            {label}
        </text>
    )
}

Label.propTypes = {
    key: React.PropTypes.string,
    index: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.any,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    showPercent: React.PropTypes.bool,
    total: React.PropTypes.number,
    highlight: React.PropTypes.any,
    textAnchor: React.PropTypes.string,
}

export default Label
