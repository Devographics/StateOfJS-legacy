import React from 'react'
import classNames from 'classnames'

const Tick = props => {
    const { highlight, key, x, y } = props
    const value = props.payload.value
    return (
        <text
            className={classNames('tick', { 'tick-highlighted': highlight === value })}
            x={x}
            y={y + 3}
            textAnchor="end"
        >
            {value}
        </text>
    )
}

Tick.propTypes = {
    key: React.PropTypes.string,
    index: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.any,
    highlight: React.PropTypes.any,
    payload: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
}

export default Tick
