import React from 'react'
import _, { includes } from 'lodash'

export default class ChartLegendSVG extends React.Component {

  constructor () {
    super()
    this.getFill = this.getFill.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  // get the fill color for a given response according to the current active filter
  getFill (responseName) {
    const response = this.props.responses[responseName]
    return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
  }

  renderItem ({ string }, key) {
    const fill = this.getFill(key)
    return (
      <g className="legend-svg-item" key={key}>
        <text fill="black" x="50%" y="50" textAnchor="middle" style={{ fontSize: 14 }}>{string}</text> 
      </g>
    )
  }

  render () {
    return (
      <g className="legend-svg">
        {_.map(this.props.responses, this.renderItem)}
      </g>
    )
  }

}

ChartLegendSVG.propTypes = {
  responses: React.PropTypes.object,
  filter: React.PropTypes.string,
}
