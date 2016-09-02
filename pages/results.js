import React from 'react'
import { filter, reduce, includes, values, sumBy, isString } from 'lodash'
import DocumentTitle from 'react-document-title'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts'
import data from '../data/frontend.json'
import './_results.scss'

const FILTER = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const SECTIONS = {
  neverHeard: {
    string: "I've never heard of it",
    onColor: '#e8e8e8',
    offColor: '#e8e8e8',
    filters: ['All']
  },
  notInterested: {
    string: "I've heard of it, and am not interested",
    onColor: '#b3d8da',
    offColor: '#dadada',
    filters: ['All', 'Interest']
  },
  wantToLearn: {
    string: "I've heard of it, and would like to learn it",
    onColor: '#4cbcc1',
    offColor: '#cecece',
    filters: ['All', 'Interest']
  },
  notAgain: {
    string: "I've used it before, and would not use it again",
    onColor: '#e0a4bc',
    offColor: '#dadada',
    filters: ['All', 'Satisfaction']
  },
  useAgain: {
    string: "I've used it before, and would use it again",
    onColor: '#e91467',
    offColor: '#cecece',
    filters: ['All', 'Satisfaction']
  }
}

const Label = ({ currentFilter, key, index, value, x, y, height }) => {
  
  // overall total for all values (not used)
  // let total = sumBy(values(value.data), (d) => (isString(d) ? 0 : d))
  
  // get all currently highlighted sections
  const highlightedSections = filter(SECTIONS, section => {
    return includes(section.filters, currentFilter)
  })

  // sum the total users for the currently highlighted sections
  let subtotal = 0
  highlightedSections.forEach(section => {
    subtotal += value.data[section.string]
  })

  const label = `${(100 * (value[1] - value[0]) / subtotal).toFixed(0)}%`
  return (
    <g key={key} className="recharts-cartesian-axis-label">
      <text className="label" x={x} y={y + 10 + height/2} textAnchor="middle" fontSize="12" fill="white" >
        {label}
      </text>
    </g>
  )
}

class ResultsChart extends React.Component {

  // get the fill color for a given section according to the current active filter
  getFill(sectionName) {
    const section = SECTIONS[sectionName]
    return includes(section.filters, this.props.filter) ? section.onColor : section.offColor
  }
  
  render() {
    const CustomLabel = <Label currentFilter={this.props.filter}/>
    return (
      <BarChart width={600} height={400} data={data} barCategoryGap="30%" margin={{top: 60, right: 20, left: 20, bottom: 5}}>
        <XAxis dataKey="Framework" tickLine={false} axisLine={{ stroke: '#666' }} />
        <Legend align="left" wrapperStyle={{top: 20}}/>
        <Tooltip/>
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
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      filter: FILTER.ALL,
    }
  }

  handleSelect(filter) {
    this.setState({ filter })
  }

  render () {
    const filter = this.state
    return (
      <DocumentTitle title="Results">
        <div className={this.state.filter.toLowerCase()}>
          <h2>Results</h2>
          <ResultsFilter handleSelect={this.handleSelect} />
          <ResultsChart filter={this.state.filter} />
        </div>
      </DocumentTitle>
    )
  }
}
