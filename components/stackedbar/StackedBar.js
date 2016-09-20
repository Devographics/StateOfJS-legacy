import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Filters from './Filters.js'
import Chart from './Chart.js'
import ChartLegend from './ChartLegend.js'
import ShareChart from '../common/ShareChart.js'

export default class StackedBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      showPercent: true,
    }
  }

  handleToggle (option) {
    // either set the state based on "option" argument, or else just toggle it
    const showPercent = (option && option === 'percent') || !this.state.showPercent
    this.setState({ showPercent })
  }

  render () {
    const { showPercent } = this.state
    const { filter } = this.props
    return (
      <div className={classNames('chart', 'stacked-chart', filter.toLowerCase(), {percent: showPercent}, {numbers: !showPercent})}>
        <Filters {...this.props} handleToggle={this.handleToggle} />
        <Chart {...this.props} filter={this.props.filter} showPercent={showPercent} handleToggle={this.handleToggle}/>
        <ChartLegend {...this.props} filter={this.props.filter} />
        <ShareChart {...this.props} />
      </div>
    )
  }
}

StackedBar.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
  responses: React.PropTypes.object,
  filters: React.PropTypes.object,
  filter: React.PropTypes.string,
  handleSelect: React.PropTypes.func,
}
