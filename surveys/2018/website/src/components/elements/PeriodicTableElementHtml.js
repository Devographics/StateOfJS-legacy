import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import periodicTableData from '../../data/periodic_table.yml'
import ranking from '../../data/results/tools_ranking.yml'
import { computePeriodicTableElement } from '../../helpers/periodicTable'
import { getToolName } from '../../helpers/wording'

export default class PeriodicTableElementHtml extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        tool: PropTypes.string.isRequired
    }

    render() {
        const { tool, size, style, ...rest } = this.props

        const layout = computePeriodicTableElement(size)
        const color = '#41c7c7' //periodicTableData.sections[section]
        const symbol = periodicTableData.tools[tool] || '??'
        const rank = ranking[tool] || '?'

        return (
            <div
                className="PeriodicTableElementHtml"
                style={{
                    width: size,
                    height: size,
                    ...(style || {})
                }}
                {...rest}
            >
                <div
                    className="PeriodicTableElementHtml_Index"
                    style={{
                        fontSize: layout.indexFontSize,
                        height: layout.indexFontSize,
                        top: layout.padding,
                        left: layout.padding
                    }}
                >
                    {rank}
                </div>
                <div
                    className="PeriodicTableElementHtml_Symbol"
                    style={{
                        top: layout.symbolY,
                        height: layout.symbolHeight,
                        fontSize: layout.symbolFontSize,
                        color
                    }}
                >
                    {symbol}
                </div>
                <div
                    className="PeriodicTableElementHtml_Label"
                    style={{
                        fontSize: layout.labelFontSize,
                        top: layout.labelY,
                        height: layout.labelHeight
                    }}
                >
                    {getToolName(tool)}
                </div>
            </div>
        )
    }
}
