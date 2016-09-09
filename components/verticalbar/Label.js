import React from 'react'

const Label = (props) => {
  const { key, value, x, y } = props

  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={x-10} y={y} textAnchor="end" >
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
  x: React.PropTypes.number,
  y: React.PropTypes.number,
}

export default Label
