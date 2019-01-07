import React from 'react'
import PropTypes from 'prop-types'

const Element = ({ id, name, symbol, stars, color }) => (
    <a className="periodic-element" target="_blank" rel="noopener noreferrer" href={`https://bestofjs.org/projects/${id}`}>
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text className="periodic-element-stars" x="10" y="20" fontSize="14" fill="white">
                {parseInt(stars / 1000, 0)}
            </text>

            <text
                className="periodic-element-symbol"
                x="50"
                y="60"
                width="100%"
                textAnchor="middle"
                fontSize="24"
                fill={color}
            >
                {symbol}
            </text>

            <text
                className="periodic-element-name"
                x="50"
                y="80"
                fontSize="14"
                fill={color}
                textAnchor="middle"
            >
                {name}
            </text>
        </svg>
    </a>
)

Element.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
}

export default Element
