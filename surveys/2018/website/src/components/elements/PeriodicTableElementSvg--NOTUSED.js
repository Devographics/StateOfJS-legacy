import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import periodicTableData from '../../data/periodic_table.yml'
import ranking from '../../data/results/tools_ranking.yml'
import { computePeriodicTableElement } from '../../helpers/periodicTable'
import { getToolName } from '../../helpers/wording'

const SvgWrapper = ({ children }) => (
    <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {children}
    </svg>
)

/*

Mode: 
- standalone
- chart

*/
export default class PeriodicTableElementSvg extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired
    }

    render() {
        const { tool, size, style, mode = 'standalone', ...rest } = this.props

        const layout = computePeriodicTableElement(size)
        const color = '#41c7c7' // periodicTableData.sections[section]
        const symbol = periodicTableData.tools[tool] || '??'
        const rank = ranking[tool] || '?'

        const contents = (
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
                    className="PeriodicTableElementSvg_Frame PeriodicTableElementSvg_Frame--chart"
                    style={{
                        width: size,
                        height: size,
                        ...(style || {})
                    }}
                    {...rest}
                />
                <text
                    className="PeriodicTableElementSvg_Number"
                    textAnchor="start"
                    alignmentBaseline="baseline"
                    y={layout.padding + layout.indexFontSize}
                    x={layout.padding}
                    style={{
                        fontSize: layout.indexFontSize
                    }}
                >
                    {rank}
                </text>
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
        return mode === 'standalone' ? <SvgWrapper>{contents}</SvgWrapper> : contents
    }
}
