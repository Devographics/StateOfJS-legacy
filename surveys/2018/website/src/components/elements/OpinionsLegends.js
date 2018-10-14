import React, { Component } from 'react'
import Legends from './Legends'
import { experience } from '../../constants'
import theme from '../../nivoTheme'

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

export default class OpinionsLegends extends Component {
    render() {
        return <Legends legends={legends} modifier="horizontal" />
    }
}
