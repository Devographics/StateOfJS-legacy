import React from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import tinycolor from 'tinycolor2'
import classNames from 'classnames'

const Row = (props) => {
  const { columns, rowData, rows, index } = props
  const currentRow = columns.map(c => rowData[c])

  return (
    <tr className={classNames({ 'row-highlighted': props.highlight === rows[index] })}>
      <td className="row-heading">{rows[index]}</td>
      {currentRow.map((v, i) =>
        <Cell
          {...props}
          key={i}
          index={i}
          value={v}
        />)}
    </tr>
  )
}

Row.propTypes = {
  columns: React.PropTypes.array,
  rowData: React.PropTypes.object,
  rows: React.PropTypes.array,
  index: React.PropTypes.number,
  highlightColumn: React.PropTypes.func,
  highlightedColumn: React.PropTypes.number,
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
    const max = this.props.max || 1
    const min = this.props.min || 0
    const alphaRange = max - min
    const alpha = Math.abs(value) / alphaRange
    const isHighlighted = this.props.highlightedColumn === this.props.index
    const className = classNames(
      'cell-contents',
      { 'cell-diagonal': parseInt(value, 10) === 1 },
      { 'cell-highlighted': isHighlighted }
    )

    let color

    if (this.props.disabledValues && this.props.disabledValues.indexOf(parseInt(value, 10)) !== -1) {
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

Cell.propTypes = {
  value: React.PropTypes.any,
  index: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  highlightColumn: React.PropTypes.func,
  highlightedColumn: React.PropTypes.number,
  disabledValues: React.PropTypes.array,
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
    const data = this.props.data
    const columns = this.props.columns || _.drop(_.keys(this.props.data[0]),1)
    const rows = this.props.rows

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
            {rows.map((row, index) =>
              <Row
                {...this.props}
                key={index}
                index={index}
                columns={columns}
                rowData={_.find(data, r => r['Option'] === row)}
                rows={rows}
                highlightColumn={this.highlightColumn}
                highlightedColumn={this.state.highlightedColumn}
              />)}
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
