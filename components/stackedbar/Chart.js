import React from 'react'
import _, { includes } from 'lodash'
// import DocumentTitle from 'react-document-title'
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts'
import classNames from 'classnames'

import Label from './Label.js'

export default class Chart extends React.Component {

  constructor () {
    super()
    this.renderLegendItem = this.renderLegendItem.bind(this)
  }

  // get the fill color for a given response according to the current active filter
  getFill (responseName) {
    const response = this.props.responses[responseName]
    // return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
    return includes(response.filters, this.props.filter) ? response.onColor : `url(#p${response.offColor.replace('#','')})`
  }

  // if a filter is enabled, set all
  getData () {
    return this.props.data
  }

  getString (responseName) {
    return this.props.responses[responseName].string
  }

  renderTitle () {
    return <text fill="black" x="50%" y="50" textAnchor="middle" style={{ fontSize: 24 }}>{this.props.title}</text> 
  }

  renderLegendItem ({ order, string }, key) {
    const width = (900 - (6*20))/5
    const x = ((order - 1) * width) + (order * 20)
    const fill = this.getFill(key)

    const comma = string.indexOf(',') === -1 ? '': ','
    const line1 = string.split(',')[0]+comma
    const line2 = string.split(',')[1]
    return (
      <svg className="legend-svg-item" key={key} width={width} x={x} y="50" style={{ overflow: "visible" }} >
        <rect x={0} y={7} width="12" height="10" fill={fill} />
        <text x={0} y={0} fill="#344c4c" textAnchor="start" style={{ fontSize: 14 }}>
          <tspan x="18" dy="1.2em">{line1}</tspan>
          <tspan x="18" dy="1.2em">{line2}</tspan>
        </text> 
      </svg>
    )
  }

  renderLegend () {
    return (
      <svg className="legend-svg" x={0} y="77%">
        {_.map(this.props.responses, this.renderLegendItem)}
      </svg>
    )
  }

  renderChart () {
    const { data, identifier, filter, showPercent, handleToggle, isExport } = this.props
    const dimensions = isExport ? { height: 450, width: 900 } : {}
    const margins = isExport ? { top: 70, right: 20, left: 20, bottom: 70 } : { top: 0, right: 0, left: 0, bottom: 0 }
    const style = isExport ? { backgroundColor: '#fffef0' } : {}
    const barProps = {}

    const finalData = this.getData(data, filter)

    // if this is the export mode; or if there are 4 bars or fewer,
    // then fix width at 50
    if (isExport || this.props.data.length <= 4) {
      barProps.barSize = 50
    }

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
      <BarChart
        {...dimensions}
        className={classNames(filter.toLowerCase(), { percent: showPercent }, { numbers: !showPercent })} 
        data={data}
        barCategoryGap="30%"
        margin={margins}
        onClick={handleToggle}
        style={style}
      >
        {isExport ? this.renderTitle() : null}
        {isExport ? this.renderLegend() : null}
        <defs>
          {_.map(this.props.responses, (r, i) => 
            <pattern key={i} id={`p${r.offColor.replace('#', '')}`} patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" strokeWidth="2" shapeRendering="auto" stroke={r.offColor} strokeLinecap="square" />
            </pattern>
          )}
        </defs>
        <XAxis dataKey={identifier} tickLine={false} axisLine={{ stroke: '#666' }} interval={0} />
        {/* <Tooltip/> */}
        <Bar
          className="use-again"
          isAnimationActive={false}
          dataKey={this.getString('useAgain')}
          stackId="a"
          fill={this.getFill('useAgain')}
          label={customLabel(0)}
          {...barProps}
        />
        <Bar
          className="not-use-again"
          isAnimationActive={false}
          dataKey={this.getString('notAgain')}
          stackId="a"
          fill={this.getFill('notAgain')}
          label={customLabel(1)}
        />
        <Bar
          className="want-to-learn"
          isAnimationActive={false}
          dataKey={this.getString('wantToLearn')}
          stackId="a"
          fill={this.getFill('wantToLearn')}
          label={customLabel(2)}
        />
        <Bar
          className="not-interested"
          isAnimationActive={false}
          dataKey={this.getString('notInterested')}
          stackId="a"
          fill={this.getFill('notInterested')}
          label={customLabel(3)}
        />
        <Bar
          className="never-heard"
          isAnimationActive={false}
          dataKey={this.getString('neverHeard')}
          stackId="a"
          fill={this.getFill('neverHeard')}
          label={customLabel(4)}
        />
      </BarChart>
    )
  }

  render () {
    return this.props.isExport ? this.renderChart() : <div className="chart-wrapper"><ResponsiveContainer minWidth={500} aspect={1.5} >{this.renderChart()}</ResponsiveContainer></div>
  }

}

Chart.propTypes = {
  data: React.PropTypes.array,
  responses: React.PropTypes.object,
  title: React.PropTypes.string,
  identifier: React.PropTypes.string,
  filter: React.PropTypes.string,
  showPercent: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
  isExport: React.PropTypes.bool,
}
