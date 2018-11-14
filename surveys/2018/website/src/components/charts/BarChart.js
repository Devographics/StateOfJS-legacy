import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'
import Tooltip from '../elements/Tooltip'
import libraries from '../../data/bestofjs.json'
import { barChartProps } from '../../constants'
import { getToolName } from '../../helpers/wording'

const tooltipWidth = 240
const marginWidth = 10
const barHeight = 40

const TickLabel = ({ label, active }) => (
    <text
        alignmentBaseline="central"
        textAnchor="end"
        transform="translate(-10,0) rotate(0)"
        className={`Bar__Tick__Label ${active ? 'Bar__Tick__Label--hoverable' : ''}`}
    >
        {label}
    </text>
)

const TickItem = tick => {
    const { key } = tick
    const libraryName = getToolName(key)
    const library = libraries.projects.find(project => project.slug === key)
    const labelWidth = key.length * 7
    const tickProps = {
        className: 'Bar__Tick',
        key,
        transform: `translate(${tick.x},${tick.y})`
    }

    if (!library) {
        return (
            <g {...tickProps}>
                <TickLabel label={libraryName} />
            </g>
        )
    } else {
        return (
            <g {...tickProps}>
                <foreignObject
                    className="Bar__Tooltip__Wrapper"
                    x={-tooltipWidth / 2 - marginWidth - labelWidth / 2}
                    y="20"
                    width="240"
                    height="240"
                >
                    <Tooltip library={library} />
                </foreignObject>
                <TickLabel label={libraryName} active={true} />
            </g>
        )
    }
}

const BarTooltip = ({ indexValue, value }) => (
    <span>
        {getToolName(indexValue)}
        :&nbsp;
        <strong>{value}</strong>
    </span>
)

const BarChart = ({ data }) => (
    <div className="Bar__Chart chart-wrapper" style={{ height: data.length * barHeight }}>
        <ResponsiveBar
            {...barChartProps}
            data={data}
            indexBy="name"
            keys={['count']}
            colors={colorRange}
            theme={theme}
            axisTop={{
                format: '.2s'
            }}
            axisLeft={{
                renderTick: TickItem
            }}
            tooltip={BarTooltip}
            layers={['grid', 'bars', 'axes', 'markers', 'legends']}
        />
    </div>
)

BarChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default BarChart
