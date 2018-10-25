import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

const defaultColor = '#41c7c7'

const PeriodicElement = ({
    className,
    name,
    symbol,
    number,
    color = defaultColor,
    mode = 'standalone',
    size = 100,
    path,
    x,
    y,
    fire = false,
    hoverCoords = {}
}) => (
    <svg
        width={size}
        height={size}
        x={x}
        y={y}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`PeriodicTableElement ${className}`}
        transform="translate(295 115)"
        onClick={() => {
            if (path) {
                navigate(path)
            }
        }}
    >
        {/* Placeholder used so that cursor doesn't leave hover zone when hovering */}
        <rect
            x="0"
            y="0"
            width={size}
            height={size}
            className="PeriodicTableElement_Placeholder"
            fill="red"
            fillOpacity="0"
        />
        <g
            className="PeriodicTableElement_Container"
            style={{ '--dx': `${hoverCoords.dx}px`, '--dy': `${hoverCoords.dy}px` }}
        >
            <rect
                x="0"
                y="0"
                width={size}
                height={size}
                className={`PeriodicTableElement_Frame PeriodicTableElement_Frame--${mode}`}
            />

            {fire && (
                <image
                    xlinkHref="/images/pixel-fire.gif"
                    x="10%"
                    height={size}
                    width={size}
                    opacity="0.4"
                />
            )}

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
        </g>
    </svg>
)

PeriodicElement.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired
}

export default PeriodicElement
