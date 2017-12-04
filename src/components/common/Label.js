import React from 'react'
import PropTypes from 'prop-types'
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
    key: PropTypes.string,
    index: PropTypes.number,
    data: PropTypes.array,
    value: PropTypes.any,
    x: PropTypes.number,
    y: PropTypes.number,
    showPercent: PropTypes.bool,
    total: PropTypes.number,
    highlight: PropTypes.any,
    textAnchor: PropTypes.string,
}

export default Label
