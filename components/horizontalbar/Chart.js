import React from 'react'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import _, { max } from 'lodash'
import Label from './Label.js'

export default class Chart extends React.Component {

  render () {
    return (
      <ResponsiveContainer minHeight={600} width="100%" >
        <BarChart data={this.props.data} layout="horizontal" barCategoryGap="30%" margin={{ top: 0, right: 0, left: 20, bottom: 0 }} >
          <XAxis dataKey="Option" type="category" tickLine={false} axisLine={{ stroke: '#5ec6cc' }} />
          <YAxis hide type="number" tickLine axisLine={{ stroke: '#5ec6cc' }} domain={[0, max(this.props.data.map(d => parseInt(d.Mentions, 10)))]} />
          <Bar isAnimationActive={false} dataKey="Value" fill="#5ec6cc" label={<Label/>} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

}

Chart.propTypes = {
  data: React.PropTypes.array,
  responses: React.PropTypes.object,
  identifier: React.PropTypes.string,
  filter: React.PropTypes.string,
  showPercent: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
}
