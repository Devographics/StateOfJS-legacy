import React from 'react'
import * as d3 from 'd3'

const _key = (key) => `${key.section}__${key.option}`
const _key1 = (d) => _key(d.key1)
const _key2 = (d) => _key(d.key2)
const _key12 = (d) => `${_key1(d)}++${_key2(d)}`

class Heatmap extends React.Component {
  render() {
    const { width, height, data } = this.props

    const x = d3.scaleBand()
      .domain(data.map(_key1))
      .rangeRound([0, width], 0)
    const y = d3.scaleBand()
      .domain(data.map(_key1))
      .rangeRound([0, height], 0)

    const minCount = d3.min(data, (d) => d.count)
    const maxCount = d3.max(data, (d) => d.count)

    const z = d3.scaleLinear()
      .domain([minCount, maxCount])
      .range(['white', 'red'])

    const cellWidth = x.bandwidth()
    const cellHeight = x.bandwidth()

    console.log(minCount, maxCount, cellWidth, cellHeight)

    return (
      <svg width={width} height={height}>
        {data.map((d) => {
          return (
            <rect
              key={_key12(d)}
              x={x(_key1(d))} y={y(_key2(d))}
              width={cellWidth} height={cellHeight}
              fill={z(d.count)}
            />
          )
        })}
      </svg>
    )
  }
}

Heatmap.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array,
}

export default Heatmap
