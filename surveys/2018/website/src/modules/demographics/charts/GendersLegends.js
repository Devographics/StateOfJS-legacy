import React from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'
import Trans from 'core/i18n/Trans'
import { genderNameToTranslationKey } from "core/i18n/translation-key-getters"


const legends = (translate) => Object.keys(theme.genderColors).map(gender => ({
    id: gender,
    label: translate(genderNameToTranslationKey(gender)),
    color: theme.genderColors[gender]
}))

const GenderLegends = () => <Trans>{translate => (<Legends legends={legends(translate)} modifier="horizontal" />)}</Trans>

export default GenderLegends
