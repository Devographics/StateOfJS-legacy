import React from 'react'

const IndicatorLeft = () => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--left">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="100"
            viewBox="0 0 30 100"
            className="Indicator--left"
        >
            <g id="Outline_Icons">
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                    x1="30"
                    y1="0"
                    x2="0"
                    y2="50"
                />
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                    x1="0"
                    y1="50"
                    x2="30"
                    y2="100"
                />
            </g>
        </svg>
    </span>
)
const IndicatorRight = () => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--right">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="100"
            viewBox="0 0 30 100"
            className="Indicator--right"
        >
            <g id="Outline_Icons">
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="50"
                />
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                    x1="30"
                    y1="50"
                    x2="0"
                    y2="100"
                />
            </g>
        </svg>
    </span>
)

const ChartContainer = ({ children, height }) => (
    <div className="Chart__Container__Outer">
        <div className="Chart__Container">
            <div className="Chart__Container__Inner" style={{ height }}>
                {children}
            </div>
        </div>
        <IndicatorLeft />
        <IndicatorRight />
    </div>
)

export default ChartContainer
