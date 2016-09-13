import React from 'react'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import _, { max } from 'lodash'
import Label from './Label.js'
import Tick from './Tick.js'

export default class Chart extends React.Component {

  render () {
    return (
      <ResponsiveContainer minHeight={600} width="100%" >
        <BarChart barSize={50} data={this.props.data} layout="vertical" barCategoryGap={10} margin={{ top: 0, right: 60, left: 60, bottom: 0 }} >
          <YAxis dataKey="Option" interval={0} type="category" tickLine={false} tick={<Tick highlight={this.props.highlight}/>} axisLine={{ stroke: '#5ec6cc' }} />
          <XAxis hide type="number" domain={[0, max(this.props.data.map(d => parseInt(d.Mentions, 10)))]} />
          <Bar isAnimationActive={false} dataKey="Value" fill="#5ec6cc" label={<Label highlight={this.props.highlight} />} />
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
  highlight: React.PropTypes.any,
  showPercent: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
}
