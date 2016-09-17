import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart from './Chart.js'

export default class HorizontalBar extends React.Component {

  render () {
    return (
      <div className={classNames('chart', 'horizontal-chart')}>
        <Chart {...this.props} />
      </div>
    )
  }
}

HorizontalBar.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
}
