import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { ResponsiveBar } from 'nivo'
import { colors } from '../../constants'
import theme from '../../nivoTheme'

import {
    experience,
    experienceKeys,
    experienceInterestKeys,
    experienceSatisfactionKeys,
    experienceColors,
} from '../../constants'

const keysByFacet = {
    all: experienceKeys,
    interest: experienceInterestKeys,
    satisfaction: experienceSatisfactionKeys,
}

/**
 * We want to display the various options in the following order (ltr):
 *
 *   never_heard | not_interested | would_learn | would_use | would_not_use
 *
 * But we also want to use diverging bars to clearly identify awareness/interest VS satisfaction,
 * to do so, we turn the awareness/interest values to negative ones.
 */
const keys = [
    experience.would_use,
    experience.would_not_use,
    experience.would_learn,
    experience.not_interested,
    experience.never_heard,
]

const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
}
const getLabel = d => Math.abs(d.value)
const colorBy = d => experienceColors[d.id]
const markers = [
    {
        axis: 'x',
        value: -25000,
        lineStyle: { stroke: '#000', strokeOpacity: 0 },
        textStyle: { fill: colors.greyDark },
        legend: 'awareness',
        legendPosition: 'top-right',
        legendOffsetX: 0,
        legendOffsetY: 4,
    },
    {
        axis: 'x',
        value: 0,
        lineStyle: { stroke: colors.purple, strokeWidth: 1 },
        textStyle: { fill: colors.yellowDark },
        legend: 'interest',
        legendPosition: 'top-left',
        legendOffsetY: 4,
    },
    {
        axis: 'x',
        value: 0,
        lineStyle: { stroke: '#000', strokeOpacity: 0 },
        textStyle: { fill: colors.purpleDark },
        legend: 'satisfaction',
        legendPosition: 'top-right',
        legendOffsetY: 4,
    },
]
const axisRight = {
    tickSize: 0,
    tickPadding: 16,
}
const axisBottomFormatter = format('.2s')
const axisBottom = { format: v => v }

export default class ExperienceBar extends Component {
    static propTypes = {
        facet: PropTypes.oneOf(Object.keys(keysByFacet)).isRequired,
        data: PropTypes.array.isRequired,
        indexBy: PropTypes.string.isRequired,
    }

    render() {
        const { data, indexBy, facet } = this.props

        return (
            <div className="results-chart-wrapper">
            <div style={{ height: data.length * 60 }}>
                <ResponsiveBar
                    margin={margin}
                    layout="vertical"
                    padding={0.6}
                    data={data}
                    keys={keys}
                    indexBy={indexBy}
                    colorBy={colorBy}
                    label={getLabel}
                    labelSkipWidth={32}
                    labelSkipHeight={20}
                    labelFormat=".2s"
                    labelTextColor="inherit:darker(1)"
                    enableLabel={true}
                    enableGridX={false}
                    enableGridY={true}
                    animate={true}
                    motionStiffness={120}
                    motionDamping={15}
                    axisLeft={null}
                    axisRight={null}
                    axisBottom={null}
                    theme={theme}
                />
            </div>
            </div>
        )
    }
}
