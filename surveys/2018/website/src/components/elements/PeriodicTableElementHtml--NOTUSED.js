import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { computePeriodicTableElement } from '../../helpers/periodicTable'

export default class PeriodicTableElementHtml extends PureComponent {
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        number: PropTypes.number,
        name: PropTypes.string.isRequired
    }

    render() {
        const { symbol, number, name, size, style, ...rest } = this.props

        const layout = computePeriodicTableElement(size)
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
                    className="PeriodicTableElementHtml_Number"
                    style={{
                        fontSize: layout.indexFontSize,
                        height: layout.indexFontSize,
                        top: layout.padding,
                        left: layout.padding
                    }}
                >
                    {number}
                </div>
                <div
                    className="PeriodicTableElementHtml_Symbol"
                    style={{
                        top: layout.symbolY,
                        height: layout.symbolHeight,
                        fontSize: layout.symbolFontSize,
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
                    {name}
                </div>
            </div>
        )
    }
}
