import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import periodicTableData from '../../data/periodic_table.yml'
import { computePeriodicTableElement } from '../../helpers/periodicTable'
import { getToolName } from '../../helpers/wording'

export default class PeriodicTableElementSvg extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired
    }

    render() {
        const { tool, size, style, ...rest } = this.props

        const layout = computePeriodicTableElement(size)
        const color = '#41c7c7' // periodicTableData.sections[section]
        const symbol = periodicTableData.tools[tool]

        return (
            <g>
                <rect
                    className="PeriodicTableElementSvg_Shadow"
                    y={size / 14}
                    style={{
                        width: size,
                        height: size
                    }}
                />
                <rect
                    className="PeriodicTableElementSvg"
                    style={{
                        width: size,
                        height: size,
                        ...(style || {})
                    }}
                    {...rest}
                />
                <rect
                    className="PeriodicTableElementSvg_Index"
                    width={layout.indexSize}
                    height={layout.indexSize}
                    y={layout.padding}
                    x={layout.padding}
                />
                <text
                    className="PeriodicTableElementSvg_Symbol"
                    x={layout.centerX}
                    y={layout.symbolY + layout.symbolHeight}
                    textAnchor="middle"
                    alignmentBaseline="baseline"
                    style={{
                        fontSize: layout.symbolFontSize,
                        fill: color
                    }}
                >
                    {symbol}
                </text>
                <text
                    className="PeriodicTableElementSvg_Label"
                    x={layout.centerX}
                    y={layout.labelY + layout.labelHeight}
                    textAnchor="middle"
                    alignmentBaseline="baseline"
                    style={{
                        fontSize: layout.labelFontSize
                    }}
                >
                    {getToolName(tool)}
                </text>
            </g>
        )
    }
}
