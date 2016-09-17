import React from 'react'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import _, { max } from 'lodash'
import Label from './Label.js'
import Tick from './Tick.js'

export default class Chart extends React.Component {

  render () {
    const rowCount = this.props.data.length -1
    const aspect = 15 / rowCount
    return (
      <ResponsiveContainer aspect={aspect} width="100%" >
        <BarChart barSize={20} data={this.props.data} layout="vertical" barGap={5} margin={{ top: 0, right: 50, left: 20, bottom: 0 }} >
          <defs>
            <pattern id="cfwue" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" strokeWidth="6" shapeRendering="auto" stroke="#5ec6cc" strokeLinecap="square" />
            </pattern>
          </defs>
          <YAxis dataKey="Option" interval={0} type="category" tickLine={false} tick={<Tick highlight={this.props.highlight}/>} axisLine={{ stroke: '#5ec6cc' }} />
          <XAxis hide type="number" domain={[0, max(this.props.data.map(d => parseInt(d.Mentions, 10)))]} />
          <Bar isAnimationActive={false} dataKey="Value" fill="url(#cfwue)" label={<Label highlight={this.props.highlight} />} />
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
