import React from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'

const legends = Object.keys(theme.sourceColors).map(source => ({
    id: source,
    label: source,
    color: theme.sourceColors[source]
}))

const SourceLegends = () => <Legends legends={legends} modifier="horizontal" />

export default SourceLegends
