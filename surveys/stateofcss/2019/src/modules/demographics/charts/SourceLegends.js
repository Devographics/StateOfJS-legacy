import React from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'
import Trans from 'core/i18n/Trans'
import { sourceNameToTranslationKey } from 'core/i18n/translation-key-getters'

const legends = translate =>
    Object.keys(theme.sourceColors).map(source => ({
        id: source,
        label: source === 'other_unknown' ? translate(sourceNameToTranslationKey(source)) : source,
        color: theme.sourceColors[source]
    }))

const SourceLegends = () => (
    <Trans>{translate => <Legends legends={legends(translate)} modifier="horizontal" />}</Trans>
)

export default SourceLegends
