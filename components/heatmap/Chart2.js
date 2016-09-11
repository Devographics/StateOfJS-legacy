import React from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import tinycolor from 'tinycolor2'

const Row = ({ columns, row, rows, index }) => {
  const currentRow = columns.map(c => row[c])
  console.log(currentRow)
  return (
    <tr>
      <td>{rows[index]}</td>
      {currentRow.map(v => <Cell value={v} />)}
    </tr>
  )
}

const Cell = ({ value }) => {
  const opacity =(( value/100) * 0.8) + 0.2
  const color = tinycolor(`rgba (255, 0, 0, ${opacity})`).toRgbString()
  return (
    <td style={{backgroundColor: color}}><span>{value}</span></td>
  )
}

class Chart2 extends React.Component {

  render () {

    console.log(this.props.data)

    const columns = this.props.columns
    const rows = _.drop(_.keys(this.props.data[0]),4)
    const data = _.drop(this.props.data, 4)

    console.log(columns)
    console.log(rows)
    console.log(data)

    return (
      <table className="heatmap-table">
        <thead>
          <tr>
            <td></td>
            {columns.map(c => <td>{c}</td>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => <Row key={index} index={index} columns={columns} row={row} rows={rows} />)}
        </tbody>
      </table>
    )
  }
}

Chart2.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array,
}

export default Chart2
