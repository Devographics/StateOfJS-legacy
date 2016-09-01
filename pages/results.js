import React from 'react'
import { includes, values } from 'lodash'
import DocumentTitle from 'react-document-title'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts'
import data from '../data/frontend.json'
import './_results.scss'

const FILTER = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
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
      <BarChart width={600} height={400} data={data} barCategoryGap="30%" margin={{top: 75, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="Framework" tickLine={false} />
        <Legend align="left" wrapperStyle={{top: 20}}/>
        <Tooltip/>
        <Bar className="use-again" isAnimationActive={false} dataKey="I've used it before, and would use it again" stackId="a" fill={fills.useAgain} />
        <Bar className="not-use-again" isAnimationActive={false} dataKey="I've used it before, and would not use it again" stackId="a" fill={fills.notAgain} />
        <Bar className="want-to-learn" isAnimationActive={false} dataKey="I've heard of it, and would like to learn it" stackId="a" fill={fills.wantToLearn} />
        <Bar className="not-interested" isAnimationActive={false} dataKey="I've heard of it, and am not interested" stackId="a" fill={fills.notInterested} />
        <Bar className="never-heard" isAnimationActive={false} dataKey="I've never heard of it" stackId="a" fill={fills.neverHeard} />
      </BarChart>
    )
  }
}

ResultsChart.propTypes = {
  filter: React.PropTypes.string,
}

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
        <div>
          <h2>Results</h2>
          <img width="100%" src="/images/chart.png" />
          <ol>
            {values(FILTER).map((filter) => {
              return (
                <li key={filter} onClick={(e) => {
                  e.preventDefault()
                  this.setState({ filter })
                }}>
                  {filter}
                </li>
              )
            })}
          </ol>
          <ResultsChart filter={this.state.filter} />
        </div>
      </DocumentTitle>
    )
  }
}
