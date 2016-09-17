import React from 'react'
import _, { includes } from 'lodash'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts'
import Label from './Label.js'

export default class Chart extends React.Component {

  // get the fill color for a given response according to the current active filter
  getFill (responseName) {
    const response = this.props.responses[responseName]
    // return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
    return includes(response.filters, this.props.filter) ? response.onColor : `url(#p${response.offColor.replace('#','')})`
  }

  render () {
    const { data, identifier, filter, showPercent, handleToggle } = this.props
   
    // create getter and setter to let labels access each other's coordinates
    const bars = 5
    const columns = data.length
    const coords = new Array(columns)
    for (let i = 0; i < columns; i++) {
      coords[i] = new Array(bars)
    }
    const setCoords = (column, bar, coord) => {
      coords[column][bar] = coord
    }
    const getCoords = (column, bar) => coords[column][bar]

    const customLabel = barNumber => <Label {...this.props} setCoords={setCoords} getCoords={getCoords} currentFilter={filter} showPercent={showPercent} barNumber={barNumber} />
    
    return (
      <ResponsiveContainer minHeight={450}>
        <BarChart data={data} barCategoryGap="30%" margin={ {top: 0, right: 30, left: 30, bottom: 0} } onClick={handleToggle} >
          <defs>
            {_.map(this.props.responses, r => 
              <pattern key={r.offColor} id={`p${r.offColor.replace('#', '')}`} patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" strokeWidth="2" shapeRendering="auto" stroke={r.offColor} strokeLinecap="square" />
              </pattern>
            )}
          </defs>
          <XAxis dataKey={identifier} tickLine={false} axisLine={{ stroke: '#666' }} interval={0} />
          {/* <Tooltip/> */}
          <Bar
            className="use-again"
            isAnimationActive={false}
            dataKey="I've used it before, and would use it again"
            stackId="a"
            fill={this.getFill('useAgain')}
            label={customLabel(0)}
          />
          <Bar
            className="not-use-again"
            isAnimationActive={false}
            dataKey="I've used it before, and would not use it again"
            stackId="a"
            fill={this.getFill('notAgain')}
            label={customLabel(1)}
          />
          <Bar
            className="want-to-learn"
            isAnimationActive={false}
            dataKey="I've heard of it, and would like to learn it"
            stackId="a"
            fill={this.getFill('wantToLearn')}
            label={customLabel(2)}
          />
          <Bar
            className="not-interested"
            isAnimationActive={false}
            dataKey="I've heard of it, and am not interested"
            stackId="a"
            fill={this.getFill('notInterested')}
            label={customLabel(3)}
          />
          <Bar
            className="never-heard"
            isAnimationActive={false}
            dataKey="I've never heard of it"
            stackId="a"
            fill={this.getFill('neverHeard')}
            label={customLabel(4)}
          />
          <Legend align="left" wrapperStyle={{ bottom: -20 }} />
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
