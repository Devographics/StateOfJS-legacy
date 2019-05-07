import React, { useContext } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import GenderLegends from './GendersLegends'
import { I18nContext } from 'core/i18n/i18nContext'
import { genderNameToTranslationKey } from 'core/i18n/translation-key-getters'

const rows = 32
const columns = 128

const GenderBreakdownWaffleChart = ({ data }) => {
    const { translate } = useContext(I18nContext)

    let total = 0
    const colors = []
    const translatedData = data.filter(d => d.gender !== 'prefer not to say').map(d => {
        colors.push(theme.genderColors[d.gender])
        total += d.count

        const gender = translate(genderNameToTranslationKey(d.gender)) || d.gender

        return {
            id: d.gender,
            label: gender,
            value: d.count
        }
    })

    return (
        <>
            <GenderLegends />
            <div className="GenderBreakdown__Chart">
                <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                    <ResponsiveWaffleCanvas
                        total={total}
                        rows={rows}
                        columns={columns}
                        data={translatedData}
                        fillDirection="left"
                        theme={theme}
                        colors={colors}
                    />
                </ChartRatioContainer>
            </div>
        </>
    )
}

export default GenderBreakdownWaffleChart
