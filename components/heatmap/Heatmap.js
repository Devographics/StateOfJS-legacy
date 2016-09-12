import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart2 from './Chart2.js'

export default class Heatmap extends React.Component {

  render () {
    return (
      <div className={classNames('chart', 'horizontal-chart')}>
        <h4 className="chart-block-title">{this.props.title}</h4>
        <Chart2 {...this.props} />
        <p className="chart-block-note">Note: “user” defined as people who picked “I've used it before, and would use it again”. Values go from -100 to +100, darker red indicates stronger positive correlation, darker blue indicates stronger negative correlation.</p>
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
