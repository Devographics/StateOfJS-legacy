import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

const defaultColor = '#41c7c7'

const PeriodicElement = ({
    name,
    symbol,
    number,
    color = defaultColor,
    mode = 'standalone',
    size = 100,
    path
}) => (
    <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="PeriodicTableElement"
        onClick={() => {
            if (path) {
                navigate(path)
            }
        }}
    >
        <rect
            x="0"
            y="0"
            width={size}
            height={size}
            className={`PeriodicTableElement_Frame PeriodicTableElement_Frame--${mode}`}
        />

        <text
            className="PeriodicTableElement_Number"
            x={size * 0.1}
            y={size * 0.2}
            fontSize={size * 0.14}
            fill="white"
        >
            {number}
        </text>

        <text
            className="PeriodicTableElement_Symbol"
            x={size * 0.5}
            y={size * 0.55}
            width="100%"
            textAnchor="middle"
            fontSize={size * 0.36}
            fill={color}
        >
            {symbol}
        </text>

        <text
            className="PeriodicTableElement_Label"
            x={size * 0.5}
            y={size * 0.78}
            fontSize={size * 0.14}
            fill={color}
            textAnchor="middle"
        >
            {name}
        </text>
    </svg>
)

PeriodicElement.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired
}

export default PeriodicElement
