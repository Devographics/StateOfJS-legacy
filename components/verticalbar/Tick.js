import React from 'react'

const Tick = (props) => {
  const { key, value, x, y } = props

  return (
    <g key={key} className="recharts-cartesian-axis-tick">
      <text className="tick" x={x} y={y+3} textAnchor="end" >
        {props.payload.value}
      </text>
    </g>
  )
}

// Tick.propTypes = {
//   key: React.PropTypes.string,
//   index: React.PropTypes.number,
//   data: React.PropTypes.array,
//   value: React.PropTypes.any,
//   x: React.PropTypes.number,
//   y: React.PropTypes.number,
// }

export default Tick
