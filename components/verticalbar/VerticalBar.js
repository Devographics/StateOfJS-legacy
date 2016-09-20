import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart from './Chart.js'
import Filters from '../common/Filters.js'

export default class VerticalBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      showPercent: false,
    }
  }

  handleToggle (option) {
    // either set the state based on "option" argument, or else just toggle it
    const showPercent = (option && option === 'percent') || !this.state.showPercent
    this.setState({ showPercent })
  }

  render () {
    const showPercent = this.state.showPercent

    return (
      <div className={classNames('chart', 'vertical-chart', {percent: showPercent}, {numbers: !showPercent})}>
        {/* <Filters handleToggle={this.handleToggle} /> */}
        <Chart {...this.props} showPercent={showPercent} />
      </div>
    )
  }
}

VerticalBar.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
}
