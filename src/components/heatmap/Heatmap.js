import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart from './Chart.js'

export default class Heatmap extends React.Component {

  render () {
    return (
      <div className={classNames('chart', 'heatmap-chart')}>
        <Chart {...this.props} />
        {this.props.note}
      </div>
    )
  }
}

Heatmap.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
}
