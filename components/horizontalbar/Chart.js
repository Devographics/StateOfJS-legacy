import React from 'react'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import _, { max } from 'lodash'

export default class Chart extends React.Component {

  render () {
    return (
      <ResponsiveContainer minHeight={400} width="100%" >
        <BarChart data={this.props.data} layout="vertical" barCategoryGap="30%" margin={{ top: 0, right: 0, left: 20, bottom: 0 }} >
          <YAxis dataKey="Option" type="category" tickLine={false} axisLine={{ stroke: '#666' }} />
          <XAxis type="number" tickLine={true} axisLine={{ stroke: '#666' }} domain={[0, max(this.props.data.map(d => parseInt(d.Mentions, 10)))]} />
          <Tooltip />
          <Bar isAnimationActive={false} dataKey="Mentions" fill="#666" />
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
