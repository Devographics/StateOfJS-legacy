import React from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import tinycolor from 'tinycolor2'

/*

Heatmap Data Import Workflow

1. export as CSV
2. Good Old Plain JavaScript => Plain JavaScript
3. No Front-End Framework => No Framework
4. I've used it before, and would use it again => Option

*/

const Row = ({ columns, data, rows, index }) => {
  const currentRow = columns.map(c => data[c])
  return (
    <tr>
      <td className="row-heading">{rows[index]}</td>
      {currentRow.map(v => <Cell value={v} />)}
    </tr>
  )
}

const Cell = ({ value }) => {
  const opacity =((value/100) * 0.8) + 0.2
  const color = parseInt(value, 10) === 100 ? '#e8e8e8' : tinycolor(`rgba (255, 0, 0, ${opacity})`).toRgbString()
  return (
    <td className="cell-contents" style={{ backgroundColor: color }}><span>{value}</span></td>
  )
}

class Chart2 extends React.Component {

  render () {
    const columns = _.drop(_.keys(this.props.data[0]),4)
    const rows = this.props.items
    const data = _.drop(this.props.data, 4)

    console.log(data)
    return (
      <table className="heatmap-table">
        <thead>
          <tr>
            <td className="row-heading"></td>
            {columns.map(c => <td className="column-heading"><span>{c}</span></td>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => <Row key={index} index={index} columns={columns} data={_.find(data, r => r['Option'] === row)} rows={rows} />)}
        </tbody>
      </table>
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
