import React from 'react'
import _, { filter, includes, min, max } from 'lodash'
// import DocumentTitle from 'react-document-title'

const Label = (props) => {
  const { responses, showPercent, currentFilter, key, setCoords, getCoords, barNumber, index, data, value, x, y, height } = props
  // get all currently highlighted responses
  const highlightedResponses = filter(responses, response => includes(response.filters, currentFilter))

  // sum the total users for all responses, or just the currently highlighted responses
  let total = 0
  const responses2 = currentFilter === 'All' ? responses : highlightedResponses
  _.forEach(responses2, response => {
    total += parseInt(value.data[response.string], 10)
  })

  const count = (value[1] - value[0])
  const percent = ((100 * count) / total).toFixed(0)
  const label = showPercent
    ? `${percent}%`
    : count

  const offsetLabel = percent < 10 || count < 400
  const xOffset = offsetLabel ? -50 : 0

  const prevLabelCoords = getCoords()

  const finalX = x + xOffset
  const calculatedY = y + 10 + (height/2)
  // const finalY = min([calculatedY, (prevLabelCoords.y + 20)])
  const finalY = calculatedY
  // console.log("---")
  console.log(props)
  // console.log(label)
  // console.log(calculatedY)
  // console.log(prevLabelCoords.y)

  setCoords({
    x: finalX,
    y: calculatedY
  })
  
  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={finalX} y={finalY} textAnchor="middle" >
        {label}
      </text>
      {offsetLabel ? <line x1={finalX + 15} y1={finalY - 5} x2={finalX + 30} y2={finalY - 5} stroke="#344c4c" strokeWidth="1"/> : null}
    </g>
  )
}

Label.propTypes = {
  responses: React.PropTypes.object,
  showPercent: React.PropTypes.bool,
  currentFilter: React.PropTypes.string,
  key: React.PropTypes.string,
  index: React.PropTypes.number,
  barNumber: React.PropTypes.number,
  data: React.PropTypes.array,
  value: React.PropTypes.array,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  height: React.PropTypes.number,
  setCoords: React.PropTypes.func,
  getCoords: React.PropTypes.func,
}

export default Label
