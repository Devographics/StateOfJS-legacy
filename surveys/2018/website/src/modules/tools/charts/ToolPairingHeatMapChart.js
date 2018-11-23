import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import periodicTableData from 'data/periodic_table.yml'
import { colors } from '../../../constants'
import PeriodicElement from 'core/components/PeriodicElement'
import Trans from 'core/i18n/Trans'
import { getToolName } from 'core/helpers/tools'

const CELL_SIZE = 46

const colorScale = scaleLinear()
    .domain([0, 0.2, 1])
    .range([colors.redLighter, colors.redLight, colors.red])

const ToolPairingHeatMapChart = ({ data }) => {
    const maxSectionTools = Math.max(...data.map(d => d.tools.length))

    const style = {
        gridTemplateColumns: `auto ${` ${CELL_SIZE}px`.repeat(maxSectionTools)}`,
        gridTemplateRows: `${CELL_SIZE}px `.repeat(data.length)
    }

    return (
        <Trans>
            {translate => (
                <div className="ToolPairing__HeatMapChart" style={style}>
                    {data.map(section => {
                        return (
                            <Fragment key={section.section}>
                                <div className="ToolPairing__HeatMapChart__Section">
                                    {translate(`section.${section.section}`)}
                                </div>
                                {section.tools.map((sectionTool, i) => (
                                    <PeriodicElement
                                        key={sectionTool.tool}
                                        className="ToolPairing__HeatMapChart__PeriodicElement"
                                        background={colorScale(sectionTool.score)}
                                        borderColor="#212424"
                                        tool={sectionTool.tool}
                                        name={getToolName(sectionTool.tool, translate)}
                                        symbol={periodicTableData.tools[sectionTool.tool]}
                                        number={i}
                                    />
                                ))}
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </Trans>
    )
}

ToolPairingHeatMapChart.propTypes = {
    tool: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            section: PropTypes.string.isRequired,
            tools: PropTypes.arrayOf(
                PropTypes.shape({
                    tool: PropTypes.string.isRequired,
                    score: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolPairingHeatMapChart
