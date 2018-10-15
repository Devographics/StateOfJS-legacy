import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import MapChart from './MapChart'
import { colors } from '../../constants'

export default class ToolOpinionMapChart extends Component {
    state = {
        opinion: 'would_use'
    }

    render() {
        const { data } = this.props

        const sizeScale = scaleLinear()
            .domain([0, 100])
            .range([0, 120])

        const buckets = data.find(s => s.survey === '2018').by_continent
        const allValues = buckets.map(b => b.percentage)
        const colorScale = scaleLinear()
            .domain([Math.min(...allValues), Math.max(...allValues)])
            .range([colors.redDark, colors.red])

        let total = 0
        const continentsData = buckets.reduce((acc, b) => {
            total += b.percentage

            return {
                ...acc,
                [b.continent]: b.percentage
            }
        }, {})

        const average = total / buckets.length
        const averageSize = sizeScale(average)
        const useInsideLabels = averageSize > 32

        return (
            <MapChart
                height={440}
                renderContinentOverlay={({ continent, centroid }) => {
                    const continentPercentage = continentsData[continent]
                    const size = sizeScale(continentPercentage)
                    const radius = size / 2
                    const color = colorScale(continentPercentage)

                    return (
                        <div
                            style={{
                                position: 'absolute',
                                top: centroid[1],
                                left: centroid[0],
                                background: colors.greyLight
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -radius,
                                    left: -radius,
                                    width: size,
                                    height: size,
                                    background: color,
                                    borderRadius: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                    overflow: 'hidden',
                                    color: '#111111',
                                    fontWeight: 500,
                                    fontSize: Math.min(radius * 0.55, 18),
                                    boxShadow: '0 2px 1px rgba(0, 0, 0, .75)'
                                }}
                            >
                                {useInsideLabels && <span>{continentPercentage}%</span>}
                            </div>
                            {!useInsideLabels && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: 60,
                                        top: -radius - 30,
                                        left: -30,
                                        textAlign: 'center',
                                        color,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        textShadow: '0 2px 0 rgba(0, 0, 0, .75)'
                                    }}
                                >
                                    {continentPercentage}%
                                </div>
                            )}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: radius + 6,
                                    left: -55,
                                    fontSize: 13,
                                    textAlign: 'center',
                                    width: 110,
                                    textShadow: '0 2px 0 rgba(0, 0, 0, .75)'
                                }}
                            >
                                {continent}
                            </div>
                        </div>
                    )
                }}
            />
        )
    }
}
