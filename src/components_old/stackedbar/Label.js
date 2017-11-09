import React from 'react'
import _, { filter, includes, min, max } from 'lodash'
// import DocumentTitle from 'react-document-title'

const Label = (props) => {
  const { responses, showPercent, currentFilter, key, setCoords, getCoords, barNumber, index, value, x, y, height } = props
  
  // sum the total users for all responses, or just the currently highlighted responses
  let total = 0
  const responsesToUse = currentFilter === 'All' ? responses : filter(responses, response => includes(response.filters, currentFilter))
  _.forEach(responsesToUse, response => {
    total += parseInt(value.data[response.string], 10)
  })

  // calculate count and percent values, and figure out label based on showPercent prop
  const count = (value[1] - value[0])
  const percent = ((100 * count) / total).toFixed(0)
  const label = showPercent
    ? `${percent}%`
    : count

  // x coordinate
  const isOffset = percent < 10 || count < 400
  const xOffset = isOffset ? -40 : 0
  const finalX = x + xOffset

  // y coordinate
  const calculatedY = y + 10 + (height/2)
  let finalY = calculatedY
  let lineYOffset = 0

  // now deploying anti-collision measures
  if (isOffset) {
    if (barNumber === 0) {
      // if this is the lowest bar, "raise" the label off the ground a bit
      finalY = calculatedY - 10
    } else {
      // if this is *not* the lowest bar, get coordinates of label right below
      // and make sure labels have enough space between them if both are offset
      const previousLabelCoords = getCoords(index, barNumber - 1)
      if (previousLabelCoords.isOffset) {
        const newY = previousLabelCoords.y - 20
        finalY = min([calculatedY, newY])
        // if offset is greater than 20, adjust line endpoint to fix angle
        if (calculatedY - newY > 20) {
          lineYOffset = 5
        }
      }
    }
  }

  // make this label's coordinates available to the next one
  setCoords(index, barNumber, {
    label,
    x: finalX,
    y: finalY,
    isOffset,
  })

  return (
    <g key={key} className="recharts-cartesian-bar-label">
      <text className="label" x={finalX} y={finalY} textAnchor="middle" >
        {label}
      </text>
      {isOffset ? <line x1={finalX + 12} y1={finalY - 5 + lineYOffset} x2={finalX + 20} y2={calculatedY - 5} stroke="#344c4c" strokeWidth="1"/> : null}
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
