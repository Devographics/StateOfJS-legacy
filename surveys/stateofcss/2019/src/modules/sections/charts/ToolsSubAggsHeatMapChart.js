import React, { Fragment, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { scaleLinear } from 'd3-scale'
import { colors } from '../../../constants'
import periodicTableData from 'data/periodic_table.yml'
import { getToolName } from 'core/helpers/tools'
import DisplayModeSwitch from 'core/components/DisplayModeSwitch'
import PeriodicElement from 'core/components/PeriodicElement'
import { I18nContext } from 'core/i18n/i18nContext'

const CELL_SIZE = 60

const ToolsSubAggsHeatMapChart = ({
    keys,
    data: _data,
    i18nNamespace,
    averageLabel,
    formatValue
}) => {
    const [displayMode, setDisplayMode] = useState('percents')
    const { translate } = useContext(I18nContext)

    const data = [..._data].sort((a, b) => a.average - b.average)

    const columns = data.length
    const rows = keys.length

    const allValues = data.reduce(
        (acc, tool) => [...acc, ...tool.ranges.map(r => r.percentage)],
        []
    )
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)

    const allAverages = data.map(tool => tool.average)
    const minAverage = Math.min(...allAverages)
    const maxAverage = Math.max(...allAverages)

    const colorScale = scaleLinear()
        .domain([min, min + (max - min) / 2, max])
        .range([colors.redLighter, colors.redLight, colors.red])

    const style = {
        gridTemplateColumns: `auto${` ${CELL_SIZE}px`.repeat(columns)}`,
        gridTemplateRows: `${CELL_SIZE}px${' 38px'.repeat(rows)} ${CELL_SIZE}px`
    }

    return (
        <div className="ToolsSubAggsHeatMapChart" style={style}>
            <div>
                <DisplayModeSwitch
                    mode={displayMode}
                    onChange={mode => {
                        setDisplayMode(mode)
                    }}
                />
            </div>
            {data.map((tool, i) => (
                <PeriodicElement
                    key={tool.tool}
                    tool={tool.tool}
                    name={getToolName(tool.tool, translate)}
                    symbol={periodicTableData.tools[tool.tool]}
                    number={i + 1}
                />
            ))}
            {[...keys].reverse().map(key => {
                return (
                    <Fragment key={key}>
                        <div className="ToolsSubAggsHeatMapChart__Heading">
                            {translate(`${i18nNamespace}.${key}.long`)}
                        </div>
                        {data.map((tool, i) => {
                            const datum = tool.ranges.find(r => r.range === key)
                            let label
                            if (displayMode === 'percents') {
                                label = `${datum.percentage}%`
                            } else {
                                label = datum.count
                            }

                            return (
                                <div
                                    key={tool.tool}
                                    className={`ToolsSubAggsHeatMapChart__Cell${
                                        i === 0 ? ' ToolsSubAggsHeatMapChart__Cell--first' : ''
                                    }`}
                                    style={{
                                        width: CELL_SIZE,
                                        background: colorScale(datum.percentage)
                                    }}
                                >
                                    {label}
                                </div>
                            )
                        })}
                    </Fragment>
                )
            })}
            <div className="ToolsSubAggsHeatMapChart__AverageHeading">{averageLabel}</div>
            {data.map((tool, i) => {
                return (
                    <div
                        key={tool.tool}
                        className={classNames('ToolsSubAggsHeatMapChart__AverageCell', {
                            'ToolsSubAggsHeatMapChart__AverageCell--first': i === 0,
                            'ToolsSubAggsHeatMapChart__AverageCell--highest':
                                tool.average === maxAverage,
                            'ToolsSubAggsHeatMapChart__AverageCell--lowest':
                                tool.average === minAverage
                        })}
                        style={{ height: CELL_SIZE }}
                    >
                        {formatValue(tool.average)}
                    </div>
                )
            })}
        </div>
    )
}

ToolsSubAggsHeatMapChart.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
    averageLabel: PropTypes.node.isRequired,
    formatValue: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            tool: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            average: PropTypes.number.isRequired,
            ranges: PropTypes.arrayOf(
                PropTypes.shape({
                    range: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired
}

ToolsSubAggsHeatMapChart.defaultProps = {
    formatValue: v => v
}

export default ToolsSubAggsHeatMapChart
