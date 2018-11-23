import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

const defaultColor = '#41c7c7'

const PeriodicElement = ({
    className,
    name,
    symbol,
    number,
    background,
    color = defaultColor,
    mode = 'standalone',
    size,
    path,
    x,
    y,
    fire = false,
    hoverCoords = {}
}) => (
    <svg
        width={size || '100%'}
        height={size}
        x={x}
        y={y}
        viewBox={`0 0 100 100`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`PeriodicTableElement ${className}`}
        onClick={() => {
            if (path) {
                navigate(path)
            }
        }}
    >
        {/*
        Placeholder used so that cursor doesn't
        leave hover zone when hovering
        */}
        <rect
            x="0"
            y="0"
            width="100"
            height="100"
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
                width="100"
                height="100"
                className={`PeriodicTableElement_Frame PeriodicTableElement_Frame--${mode}`}
                style={{
                    fill: background
                }}
            />
            {fire && (
                <image
                    xlinkHref="/images/pixel-fire.gif"
                    x="10%"
                    height="100"
                    width="100"
                    opacity="0.4"
                />
            )}
            <text
                className="PeriodicTableElement_Number"
                x={100 * 0.1}
                y={100 * 0.2}
                fontSize={100 * 0.14}
                fill="white"
            >
                {number}
            </text>
            <text
                className="PeriodicTableElement_Symbol"
                x={100 * 0.5}
                y={name ? 100 * 0.55 : 100 * 0.6}
                width="100%"
                textAnchor="middle"
                fontSize={100 * 0.36}
                fill={color}
            >
                {symbol}
            </text>
            <text
                className="PeriodicTableElement_Label"
                x={100 * 0.5}
                y={100 * 0.78}
                fontSize={100 * 0.14}
                fill={color}
                textAnchor="middle"
            >
                {name}
            </text>
        </g>
    </svg>
)

PeriodicElement.propTypes = {
    name: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    background: PropTypes.string
}

export default PeriodicElement
