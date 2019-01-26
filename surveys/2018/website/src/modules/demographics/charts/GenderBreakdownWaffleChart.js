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
        const chartData = (translate) => {
            const result = data.filter(d => d.gender !== 'prefer not to say').map(d => {
                colors.push(theme.genderColors[d.gender])
                total += d.count

                const gender = translate(genderNameToTranslationKey(d.gender)) || d.gender

                return {
                    id: d.gender,
                    label: gender,
                    value: d.count
                }
            })

            console.log("CHART DATA FOR GENDER BREAKDOWN", total);

            return result;
        }

        return (
            <Fragment>
                <GenderLegends />
                <div className="GenderBreakdown__Chart">
                    <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                        <Trans>
                            {
                                translate => {
                                    const data = chartData(translate);
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
                                }
                            }
                        </Trans>
                    </ChartRatioContainer>
                </div>
            </Fragment>
        )
    }
}
