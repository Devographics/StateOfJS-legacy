import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from '../../nivoTheme'
import { experience, experienceColors } from '../../constants'

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
    experience.never_heard
]

const margin = {
    top: 10,
    right: 0,
    bottom: 10,
    left: 0
}
const getLabel = d => Math.abs(d.value)
const colorBy = d => experienceColors[d.id]

export default class ResultsBar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        indexBy: PropTypes.string.isRequired
    }

    render() {
        const { data, indexBy } = this.props

        return (
            <div className="results-chart-wrapper resultsbar chart--bar">
                <div style={{ height: data.length * 50 }}>
                    <ResponsiveBar
                        margin={margin}
                        layout="vertical"
                        padding={0.5}
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
