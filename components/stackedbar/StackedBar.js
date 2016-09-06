import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Filters from './Filters.js'
import Chart from './Chart.js'

export default class StackedBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      showPercent: true,
    }
  }

  handleToggle () {
    const showPercent = !this.state.showPercent
    this.setState({ showPercent })
  }

  render () {
    const { showPercent } = this.state
    const { filter } = this.props
    return (
      <div className={classNames('chart', 'stacked-chart', filter.toLowerCase())}>
        <h2>{this.props.title}</h2>
        <Filters {...this.props} />
        <Chart {...this.props} filter={this.props.filter} showPercent={showPercent} handleToggle={this.handleToggle}/>
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
