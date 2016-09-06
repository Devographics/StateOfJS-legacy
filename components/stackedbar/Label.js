import React from 'react'
import _, { filter, includes } from 'lodash'
// import DocumentTitle from 'react-document-title'

const Label = ({ responses, showPercent, currentFilter, key, index, value, x, y, height }) => {
  // get all currently highlighted responses
  const highlightedResponses = filter(responses, response => includes(response.filters, currentFilter))

  // sum the total users for all responses, or just the currently highlighted responses
  let total = 0
  const responses2 = currentFilter === 'All' ? responses : highlightedResponses
  _.forEach(responses2, response => {
    total += parseInt(value.data[response.string], 10)
  })

  const count = (value[1] - value[0])
  const label = showPercent
    ? `${((100 * count) / total).toFixed(0)}%`
    : count

  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={x} y={y + 10 + (height/2)} textAnchor="middle" >
        {label}
      </text>
    </g>
  )
}

Label.propTypes = {
  responses: React.PropTypes.object,
  showPercent: React.PropTypes.bool,
  currentFilter: React.PropTypes.string,
  key: React.PropTypes.string,
  index: React.PropTypes.number,
  value: React.PropTypes.array,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  height: React.PropTypes.number,
}

export default Label