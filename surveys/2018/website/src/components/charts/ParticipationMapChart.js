import React, { Component } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import countries from '../../data/world_countries'

export default class ParticipationMapChart extends Component {
    render() {
        const width = 500
        const height = 400

        const projection = geoMercator()
            .scale(100)
            .translate([width / 2, height / 2])

        const path = geoPath(projection)

        return (
            <div>
                <svg width={width} height={height}>
                    {countries.features.map(feature => {
                        return <path key={feature.id} d={path(feature)} />
                    })}
                </svg>
            </div>
        )
    }
}
