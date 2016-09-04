import React from 'react'
import { filter, reduce, includes, values, sumBy, isString } from 'lodash'
import DocumentTitle from 'react-document-title'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import classNames from 'classnames'
import '../_results.scss'

const Label = ({ responses, showPercent, currentFilter, key, index, value, x, y, height }) => {

  // overall total for all values (not used)
  // let total = sumBy(values(value.data), (d) => (isString(d) ? 0 : d))

  // get all currently highlighted responses
  const highlightedResponses = filter(responses, response => {
    return includes(response.filters, currentFilter)
  })

  // sum the total users for the currently highlighted responses
  let subtotal = 0
  highlightedResponses.forEach(response => {
    subtotal += value.data[response.string]
  })

  const count = (value[1] - value[0])
  const label = showPercent
    ? `${(100 * count / subtotal).toFixed(0)}%`
    : count

  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={x} y={y + 10 + height/2} textAnchor="middle" fontSize="12" fill="white" >
        {label}
      </text>
    </g>
  )
}

class ResultsChart extends React.Component {

  // get the fill color for a given response according to the current active filter
  getFill(responseName) {
    const response = this.props.responses[responseName]
    return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
  }

  render() {
    const { filter, showPercent, handleToggle } = this.props
    const CustomLabel = <Label {...this.props} currentFilter={filter} showPercent={showPercent} />
    return (
      <BarChart width={600} height={400} data={this.props.data} barCategoryGap="30%" margin={{top: 60, right: 20, left: 20, bottom: 5}} onClick={handleToggle} >
        <XAxis dataKey={this.props.identifier} tickLine={false} axisLine={{ stroke: '#666' }} />
        <Legend align="left" wrapperStyle={{top: 20}}/>
        {/* <Tooltip/> */}
        <Bar className="use-again" isAnimationActive={false} dataKey="I've used it before, and would use it again" stackId="a" fill={this.getFill("useAgain")} label={CustomLabel} />
        <Bar className="not-use-again" isAnimationActive={false} dataKey="I've used it before, and would not use it again" stackId="a" fill={this.getFill("notAgain")} label={CustomLabel} />
        <Bar className="want-to-learn" isAnimationActive={false} dataKey="I've heard of it, and would like to learn it" stackId="a" fill={this.getFill("wantToLearn")} label={CustomLabel} />
        <Bar className="not-interested" isAnimationActive={false} dataKey="I've heard of it, and am not interested" stackId="a" fill={this.getFill("notInterested")} label={CustomLabel} />
        <Bar className="never-heard" isAnimationActive={false} dataKey="I've never heard of it" stackId="a" fill={this.getFill("neverHeard")} label={CustomLabel} />
      </BarChart>
    )
  }

}

ResultsChart.propTypes = {
  identifier: React.PropTypes.string,
  filter: React.PropTypes.string,
}

const ResultsFilter = ({ filters, handleSelect }) => (
  <div className="filter">
    <h3>Filter</h3>
    <ul>
      {values(filters).map((filter) => {
        return (
          <li key={filter} className={filter.toLowerCase()} onClick={(e) => {
            e.preventDefault()
            handleSelect(filter)
          }}>
            {filter}
          </li>
        )
      })}
    </ul>
  </div>
)

export default class StackedBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      showPercent: true,
    }
  }

  handleToggle() {
    const showPercent = !this.state.showPercent
    this.setState({ showPercent })
  }

  render () {
    const { showPercent } = this.state
    const { filter, filterUpdate, filterName } = this.props
    return (
      <div className={classNames("chart", "stacked-chart", filter.toLowerCase())}>
        <h2>{this.props.title}</h2>
        <ResultsFilter {...this.props} />
        <ResultsChart {...this.props} filter={this.props.filter} showPercent={showPercent} handleToggle={this.handleToggle}/>
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
