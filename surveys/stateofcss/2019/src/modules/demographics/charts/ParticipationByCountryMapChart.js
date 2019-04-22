import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { scaleLinear } from 'd3-scale'
import withPropsOnChange from 'recompose/withPropsOnChange'
import countries from 'data/geo/world_countries'
import theme from 'nivoTheme'
import { blueRange as colorRange } from '../../../constants'
import ResponsiveGeoMap from 'core/charts/geo/ResponsiveGeoMapCanvas'
import ParticipationByCountryMapChartTooltip from './ParticipationByCountryMapChartTooltip'

const legendWidth = 10
const legendHeight = 100

const colorDomain = [0, 2, 4, 24]
const colorScale = scaleLinear()
    .domain(colorDomain)
    .range(colorRange)
    .nice()
    .clamp(true)

const getFillColor = feature => (feature.data ? colorScale(feature.data.percentage) : '#333')

const renderBackground = (ctx, props) => {
    ctx.fillStyle = '#e0e4e4'
    ctx.fillRect(0, 0, props.outerWidth, props.outerHeight)
}

const renderLegend = (ctx, props) => {
    ctx.save()
    ctx.translate(20, props.outerHeight - legendHeight - 20)

    ctx.font = `11px 'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`
    ctx.textAlign = 'start'
    ctx.textBaseline = 'middle'

    const gradient = ctx.createLinearGradient(0, 0, 0, legendHeight)
    gradient.addColorStop(0, colorRange[0])
    gradient.addColorStop(0.33, colorRange[1])
    gradient.addColorStop(0.66, colorRange[2])
    gradient.addColorStop(1, colorRange[3])

    ctx.fillStyle = gradient
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1
    ctx.fillRect(0, 0, legendWidth, legendHeight)
    ctx.strokeRect(0, 0, legendWidth, legendHeight)

    ctx.fillStyle = '#cfcfcf'
    ctx.fillText(`${Math.max(...colorDomain)}%`, legendWidth + 6, 0)
    ctx.fillText(`${Math.min(...colorDomain)}%`, legendWidth + 6, legendHeight)

    ctx.restore()
}

const renderTooltip = feature =>
    feature.data && <ParticipationByCountryMapChartTooltip feature={feature} />

class ParticipationByCountryMapChart extends Component {
    static propTypes = {}

    render() {
        const { features } = this.props

        return (
            <div className="SalaryPerCountry__Chart">
                <ResponsiveGeoMap
                    features={features}
                    projectionType="mercator"
                    projectionScale={120}
                    projectionTranslation={[0.5, 0.7]}
                    fillColor={getFillColor}
                    borderWidth={0.5}
                    borderColor="#111111"
                    layers={[renderBackground, 'features', renderLegend]}
                    tooltip={renderTooltip}
                    theme={theme}
                />
            </div>
        )
    }
}

export default withPropsOnChange(['data'], ({ data }) => {
    const features = cloneDeep(countries.features)

    data.forEach(bucket => {
        const feature = features.find(f => f.properties.name === bucket.country)
        if (feature !== undefined) {
            feature.data = bucket
        } else {
            // console.error(`Unable to find matching feature for country: ${bucket.country}`)
        }
    })

    return { features }
})(ParticipationByCountryMapChart)
