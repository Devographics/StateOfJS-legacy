import React from 'react'
import theme from '../../nivoTheme'
import Legends from './Legends'

const legends = Object.keys(theme.genderColors).map(gender => ({
    id: gender,
    label: gender,
    color: theme.genderColors[gender]
}))

const GenderLegends = () => <Legends legends={legends} modifier="horizontal" />

export default GenderLegends
