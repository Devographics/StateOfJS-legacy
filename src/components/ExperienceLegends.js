import React from 'react'
import { experience, experienceColors } from '../constants'
import Legends from './Legends'

const legends = [
    experience.never_heard,
    experience.not_interested,
    experience.would_learn,
    experience.would_not_use,
    experience.would_use,
].map(key => ({
    label: key,
    color: experienceColors[key],
}))

const ExperienceLegends = () => <Legends legends={legends} modifier="horizontal" />

export default ExperienceLegends
