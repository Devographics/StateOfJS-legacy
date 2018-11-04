import React, { Component, Fragment } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import GenderLegends from '../elements/GendersLegends'
import theme from '../../nivoTheme'

export default class GenderBreakdownWaffleChart extends Component {
    render() {
        const { data } = this.props

        let total = 0
        const colors = []
        const chartData = data.filter(d => d.gender !== 'prefer not to say').map(d => {
            colors.push(theme.genderColors[d.gender])
            total += d.count

            return {
                id: d.gender,
                label: d.gender,
                value: d.count
            }
        })

        return (
            <Fragment>
                <GenderLegends />
                <div style={{ height: 260 }}>
                    <ResponsiveWaffleCanvas
                        total={total}
                        rows={32}
                        columns={128}
                        data={chartData}
                        fillDirection="left"
                        theme={theme}
                        colors={colors}
                    />
                </div>
            </Fragment>
        )
    }
}
