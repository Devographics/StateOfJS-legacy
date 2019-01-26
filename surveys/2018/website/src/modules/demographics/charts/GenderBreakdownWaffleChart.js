import React, { Component, Fragment } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import GenderLegends from './GendersLegends'
import Trans from 'core/i18n/Trans'
import { genderNameToTranslationKey } from "core/i18n/gender-name"

const rows = 32
const columns = 128

export default class GenderBreakdownWaffleChart extends Component {
    render() {
        const { data } = this.props

        let total = 0
        const colors = []
        const chartData = (translate) => data.filter(d => d.gender !== 'prefer not to say').map(d => {
            colors.push(theme.genderColors[d.gender])
            total += d.count

            return {
                id: d.gender,
                label: translate(genderNameToTranslationKey(d.gender)) || d.gender,
                value: d.count
            }
        })

        return (
            <Fragment>
                <GenderLegends />
                <div className="GenderBreakdown__Chart">
                    <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                        <Trans>
                            {translate => (
                                <ResponsiveWaffleCanvas
                                    total={total}
                                    rows={rows}
                                    columns={columns}
                                    data={chartData(translate)}
                                    fillDirection="left"
                                    theme={theme}
                                    colors={colors}
                                />
                            )}
                        </Trans>
                    </ChartRatioContainer>
                </div>
            </Fragment>
        )
    }
}
