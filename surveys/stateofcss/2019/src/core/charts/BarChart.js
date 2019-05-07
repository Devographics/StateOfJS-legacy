import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import libraries from 'data/bestofjs.json'
import theme from 'nivoTheme'
import Tooltip from '../components/Tooltip'
import { barChartProps } from '../../constants'
import { I18nContext } from '../i18n/i18nContext'
import { getToolName } from '../helpers/tools'

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

const TickItem = translate => tick => {
    const { key } = tick
    const libraryName = getToolName(key, translate)
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

// eslint-disable-next-line react/display-name
const BarTooltip = translate => ({ indexValue, value }) => (
    <span>
        {getToolName(indexValue, translate)}
        :&nbsp;
        <strong>{value}</strong>
    </span>
)

const BarChart = ({ data, chartId }) => {
    const { translate } = useContext(I18nContext)

    return (
        <div
            className="Bar__Chart chart-wrapper"
            id={chartId}
            style={{ height: data.length * barHeight }}
        >
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
                    renderTick: TickItem(translate)
                }}
                tooltip={BarTooltip(translate)}
                layers={['grid', 'bars', 'axes', 'markers', 'legends']}
            />
        </div>
    )
}

BarChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default BarChart
