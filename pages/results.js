import React from 'react'
import { includes, values, sumBy, isString } from 'lodash'
import DocumentTitle from 'react-document-title'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts'
import data from '../data/frontend.json'
import './_results.scss'

const FILTER = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const CustomLabel = ({ key, index, value, x, y, height }) => {
  const total = sumBy(values(value.data), (d) => (isString(d) ? 0 : d))
  const label = `${(100 * (value[1] - value[0]) / total).toFixed(0)}%`
  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={x} y={y + 10 + height/2} textAnchor="middle" fontSize="12" fill="white" >
        {label}
      </text>
    </g>
  )
}

class ResultsChart extends React.Component {
  getFills() {
    const highlightSatisfaction = includes([FILTER.ALL, FILTER.SATISFACTION], this.props.filter)
    const highlightInterest = includes([FILTER.ALL, FILTER.INTEREST], this.props.filter)
    const useAgain = highlightSatisfaction ? '#e91467' : '#cecece'
    const notAgain = highlightSatisfaction ? '#e0a4bc' : '#dadada'
    const wantToLearn = highlightInterest ? '#4cbcc1' : '#cecece'
    const notInterested = highlightInterest ? '#b3d8da' : '#dadada'
    const neverHeard = '#e8e8e8'
    return { useAgain, notAgain, wantToLearn, notInterested, neverHeard }
  }
  render() {
    const fills = this.getFills()
    return (
      <BarChart width={600} height={400} data={data} barCategoryGap="30%" margin={{top: 60, right: 20, left: 20, bottom: 5}}>
        <XAxis dataKey="Framework" tickLine={false} axisLine={{ stroke: '#666' }} />
        <Legend align="left" wrapperStyle={{top: 20}}/>
        <Tooltip/>
        <Bar className="use-again" isAnimationActive={false} dataKey="I've used it before, and would use it again" stackId="a" fill={fills.useAgain} label={CustomLabel} />
        <Bar className="not-use-again" isAnimationActive={false} dataKey="I've used it before, and would not use it again" stackId="a" fill={fills.notAgain} label={CustomLabel} />
        <Bar className="want-to-learn" isAnimationActive={false} dataKey="I've heard of it, and would like to learn it" stackId="a" fill={fills.wantToLearn} label={CustomLabel} />
        <Bar className="not-interested" isAnimationActive={false} dataKey="I've heard of it, and am not interested" stackId="a" fill={fills.notInterested} label={CustomLabel} />
        <Bar className="never-heard" isAnimationActive={false} dataKey="I've never heard of it" stackId="a" fill={fills.neverHeard} label={CustomLabel} />
      </BarChart>
    )
  }
}

ResultsChart.propTypes = {
  filter: React.PropTypes.string,
}

const ResultsFilter = ({ handleSelect }) => (
  <div className="filter">
    <h3>Filter</h3>
    <ul>
      {values(FILTER).map((filter) => {
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

export default class Results extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: FILTER.ALL,
    }
  }
  render () {
    const filter = this.state
    return (
      <DocumentTitle title="Results">
        <div className={this.state.filter.toLowerCase()}>
          <h2>Results</h2>
          <img width="100%" src="/images/chart.png" />
          <img width="100%" src="/images/chart2.png" />
          <ResultsFilter handleSelect={(filter) => this.setState({ filter })} />
          <ResultsChart filter={this.state.filter} />
        </div>
      </DocumentTitle>
    )
  }
}
