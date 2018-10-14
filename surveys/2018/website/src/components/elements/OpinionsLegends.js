import React from 'react'
import { experience } from '../../constants'
import theme from '../../nivoTheme'
import Legends from './Legends'

const colors = [...theme.opinionColors].reverse()

const legends = [
    experience.never_heard,
    experience.not_interested,
    experience.would_learn,
    experience.would_not_use,
    experience.would_use
].map((key, i) => ({
    label: key,
    color: colors[i]
}))

const OpinionsLegends = () => <Legends legends={legends} modifier="horizontal" />

export default OpinionsLegends
