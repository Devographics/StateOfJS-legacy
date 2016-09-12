import React from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import tinycolor from 'tinycolor2'
import classNames from 'classnames'

/*

Heatmap Data Import Workflow

1. export as CSV
2. Good Old Plain JavaScript => Plain JavaScript
3. No Front-End Framework => No Framework
4. I've used it before, and would use it again => Option
5. Remove any extra lines at the end
6. Custom REST API => REST API

*/

const Row = ({ columns, data, rows, index, highlightColumn, highlightedColumn }) => {
  const currentRow = columns.map(c => data[c])
  return (
    <tr>
      <td className="row-heading">{rows[index]}</td>
      {currentRow.map((v,i) => <Cell key={i} value={v} index={i} highlightColumn={highlightColumn} highlightedColumn={highlightedColumn} />)}
    </tr>
  )
}

class Cell extends React.Component {

  constructor () {
    super()
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  handleMouseOver () {
    this.props.highlightColumn(this.props.index)
  }
  
  handleMouseOut () {
    this.props.highlightColumn(null)
  }

  render () {

    const { value } = this.props
    const alpha = Math.abs(value)
    const isHighlighted = this.props.highlightedColumn === this.props.index
    const className = classNames(
      'cell-contents',
      { 'cell-diagonal': parseInt(value, 10) === 1 },
      { 'cell-highlighted': isHighlighted }
    )

    let color

    if (parseInt(value, 10) === 1) {
      color = '#dadada'
    } else if (value < 0) {
      color = tinycolor('#5ec6cc').setAlpha(alpha).toRgbString()
    } else {
      color = tinycolor('#ed387a').setAlpha(alpha).toRgbString()
    }
    return (
      <td onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className={className}>
        <div className="tile" style={{ backgroundColor: color }}>
          <div className="tile-value">{Math.round(value*100)}</div>
        </div>
      </td>
    )
  }
}

class Chart2 extends React.Component {

  constructor () {
    super()
    this.highlightColumn = this.highlightColumn.bind(this)
    this.state = {
      highlightedColumn: null
    }
  }

  highlightColumn (column) {
    this.setState({
      highlightedColumn: column
    })
  }

  render () {
    const columns = _.drop(_.keys(this.props.data[0]),4)
    const rows = this.props.items
    const data = _.drop(this.props.data, 4)

    return (
      <div className="heatmap-table-wrapper">
        <table className="heatmap-table rtable--flip">
          <thead>
            <tr>
              <th className="row-heading"></th>
              {columns.map(c => <th key={c} className="column-heading"><span>{c}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => <Row key={index} index={index} columns={columns} data={_.find(data, r => r['Option'] === row)} rows={rows} highlightColumn={this.highlightColumn} highlightedColumn={this.state.highlightedColumn} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

Chart2.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array,
  items: React.PropTypes.array,
}

export default Chart2
