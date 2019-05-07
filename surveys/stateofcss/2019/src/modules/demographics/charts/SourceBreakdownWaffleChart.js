import React, { Component } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import SourceLegends from './SourceLegends'
import Trans from 'core/i18n/Trans'
import { sourceNameToTranslationKey } from 'core/i18n/translation-key-getters'

const rows = 32
const columns = 128

export default class SourceBreakdownWaffleChart extends Component {
    render() {
        const { data } = this.props
        let total = 0
        const colors = []
        const chartData = translate =>
            data.map(d => {
                colors.push(theme.sourceColors[d.source])
                total += d.count

                return {
                    id: d.source,
                    label:
                        d.source === 'Other/Unknown'
                            ? translate(sourceNameToTranslationKey(d.source))
                            : d.source,
                    value: d.count
                }
            })

        return (
            <>
                <SourceLegends />
                <div className="SourceBreakdown__Chart">
                    <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                        <Trans>
                            {translate => {
                                const data = chartData(translate)

                                return (
                                    <ResponsiveWaffleCanvas
                                        total={total}
                                        rows={rows}
                                        columns={columns}
                                        data={data}
                                        fillDirection="left"
                                        theme={theme}
                                        colors={colors}
                                    />
                                )
                            }}
                        </Trans>
                    </ChartRatioContainer>
                </div>
            </>
        )
    }
}
