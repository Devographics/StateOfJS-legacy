import React, { Component, Fragment } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import SourceLegends from './SourceLegends'

const rows = 32
const columns = 128

export default class SourceBreakdownWaffleChart extends Component {
    render() {
        const { data } = this.props
        console.log(data)
        let total = 0
        const colors = []
        const chartData = data.map(d => {
            colors.push(theme.sourceColors[d.source])
            total += d.count

            return {
                id: d.source,
                label: d.source,
                value: d.count
            }
        })

        return (
            <Fragment>
                <SourceLegends />
                <div className="SourceBreakdown__Chart">
                    <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                        <ResponsiveWaffleCanvas
                            total={total}
                            rows={rows}
                            columns={columns}
                            data={chartData}
                            fillDirection="left"
                            theme={theme}
                            colors={colors}
                        />
                    </ChartRatioContainer>
                </div>
            </Fragment>
        )
    }
}
