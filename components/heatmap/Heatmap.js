import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart2 from './Chart2.js'

export default class Heatmap extends React.Component {

  render () {
    return (
      <div className={classNames('chart', 'horizontal-chart')}>
        <h4 className="chart-block-title">{this.props.chartTitle}</h4>
        <Chart2 {...this.props} />
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
