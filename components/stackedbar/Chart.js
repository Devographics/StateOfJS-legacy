import React from 'react'
import _, { filter, includes, values } from 'lodash'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts'
import classNames from 'classnames'
import Label from './Label.js'

export default class ResultsChart extends React.Component {

  // get the fill color for a given response according to the current active filter
  getFill (responseName) {
    const response = this.props.responses[responseName]
    return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
  }

  render () {
    const { filter, showPercent, handleToggle } = this.props
    const CustomLabel = <Label {...this.props} currentFilter={filter} showPercent={showPercent} />
    return (
      <ResponsiveContainer minHeight={450}>
        <BarChart data={this.props.data} barCategoryGap="30%" margin={ {top: 0, right: 0, left: 0, bottom: 0} } onClick={handleToggle} >
          <XAxis dataKey={this.props.identifier} tickLine={false} axisLine={{ stroke: '#666' }} interval={0} />
          {/* <Tooltip/> */}
          <Bar className="use-again" isAnimationActive={false} dataKey="I've used it before, and would use it again" stackId="a" fill={this.getFill('useAgain')} label={CustomLabel} />
          <Bar className="not-use-again" isAnimationActive={false} dataKey="I've used it before, and would not use it again" stackId="a" fill={this.getFill('notAgain')} label={CustomLabel} />
          <Bar className="want-to-learn" isAnimationActive={false} dataKey="I've heard of it, and would like to learn it" stackId="a" fill={this.getFill('wantToLearn')} label={CustomLabel} />
          <Bar className="not-interested" isAnimationActive={false} dataKey="I've heard of it, and am not interested" stackId="a" fill={this.getFill('notInterested')} label={CustomLabel} />
          <Bar className="never-heard" isAnimationActive={false} dataKey="I've never heard of it" stackId="a" fill={this.getFill('neverHeard')} label={CustomLabel} />
          <Legend align="left" wrapperStyle={{ bottom: -20 }} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

}

ResultsChart.propTypes = {
  data: React.PropTypes.array,
  responses: React.PropTypes.object,
  identifier: React.PropTypes.string,
  filter: React.PropTypes.string,
  showPercent: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
}
