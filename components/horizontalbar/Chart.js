import React from 'react'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import _, { max } from 'lodash'
import Label from './Label.js'

export default class Chart extends React.Component {

  render () {
    return (
      <ResponsiveContainer minHeight={400} width="100%" >
        <BarChart data={this.props.data} layout="horizontal" barCategoryGap="30%" margin={{ top: 30, right: 0, left: 0, bottom: 0 }} >
          <defs>
            <pattern id="cfwue" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" strokeWidth="6" shapeRendering="auto" stroke="#5ec6cc" strokeLinecap="square" />
            </pattern>
          </defs>
          <XAxis dataKey="Option" interval={0} type="category" tickLine={false} axisLine={{ stroke: '#5ec6cc' }} />
          <YAxis hide type="number" tickLine axisLine={{ stroke: '#5ec6cc' }} domain={[0, max(this.props.data.map(d => parseInt(d.Mentions, 10)))]} />
          <Bar isAnimationActive={false} dataKey="Value" fill="url(#cfwue)" label={<Label/>} />
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
