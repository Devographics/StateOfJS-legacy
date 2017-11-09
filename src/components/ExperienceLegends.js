import React from 'react'
import { experience, experienceColors } from '../constants'
import Legends from './Legends'

const legends = [
    experience.would_use,
    experience.would_not_use,
    experience.would_learn,
    experience.not_interested,
    experience.never_heard,
].map(key => ({
    label: key,
    color: experienceColors[key],
}))

const ExperienceLegends = () => <Legends legends={legends} modifier="vertical" />

export default ExperienceLegends
