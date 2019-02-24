import React, { useContext } from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'
import { I18nContext } from 'core/i18n/i18nContext'
import { genderNameToTranslationKey } from 'core/i18n/translation-key-getters'

const GenderLegends = () => {
    const { translate } = useContext(I18nContext)

    const legends = Object.keys(theme.genderColors).map(gender => ({
        id: gender,
        label: translate(genderNameToTranslationKey(gender)),
        color: theme.genderColors[gender]
    }))

    return <Legends legends={legends} modifier="horizontal" />
}

export default GenderLegends
