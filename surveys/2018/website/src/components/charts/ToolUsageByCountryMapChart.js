import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import { scaleQuantize } from 'd3-scale'
import withPropsOnChange from 'recompose/withPropsOnChange'
import countries from '../../data/geo/world_countries'
import theme from '../../nivoTheme'
import ResponsiveGeoMap from './geo/ResponsiveGeoMapCanvas'
import ToolUsageByCountryMapChartTooltip from './ToolUsageByCountryMapChartTooltip'
import { getToolName } from '../../helpers/wording'

const colorScale = scaleQuantize()
    .domain([-10, 10])
    .range(['#41c7c7', '#8be7e7', '#e4d6d9', '#FE6A6A', '#ca4040'])

const legendValues = [10, 5, 0, -5, -10]

const renderBackground = (ctx, props) => {
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, props.outerWidth, props.outerHeight)
}

const renderLegend = projects => (ctx, props) => {
    const { average, tool } = props
    // only keep legend values where the displayed value is positive
    const positiveLegendValues = legendValues.filter(value => average + value >= -5)
    ctx.save()
    ctx.translate(20, props.outerHeight - positiveLegendValues.length * 20 - 20)

    ctx.font = `11px 'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`
    ctx.textAlign = 'start'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#cfcfcf'
    ctx.fillText('Percentage of', 0, -35)
    ctx.fillText(`happy ${getToolName(tool, projects)} users:`, 0, -18)

    positiveLegendValues.forEach((value, i) => {
        const x = 0
        const y = i * 20
        const color = colorScale(value)
        const range = colorScale
            .invertExtent(color)
            .map(value => `${Math.max(0, Math.round(average + value))}%`)

        ctx.fillStyle = color
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 1
        ctx.fillRect(x, y, 20, 20)
        ctx.strokeRect(x, y, 20, 20)

        ctx.fillStyle = '#cfcfcf'
        ctx.fillText(range.join(' to '), 26, y + 10)
    })
    ctx.restore()
}

const getFillColor = feature =>
    feature.data ? colorScale(feature.data.delta_from_average) : '#333333'

const renderTooltip = feature =>
    feature.data && <ToolUsageByCountryMapChartTooltip feature={feature} />

class ToolUsageByCountryMapChart extends Component {
    static propTypes = {
        data: PropTypes.shape({
            percentage: PropTypes.number.isRequired,
            buckets: PropTypes.arrayOf(
                PropTypes.shape({
                    country: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired,
                    delta_from_average: PropTypes.number.isRequired
                })
            ).isRequired
        }).isRequired,
        projects: PropTypes.array.isRequired
    }

    render() {
        const {projects} = this.props
        return (
            <div className="ToolsUsageByCountry__Chart">
                <ResponsiveGeoMap
                    features={this.props.features}
                    projectionType="mercator"
                    projectionScale={120}
                    projectionTranslation={[0.5, 0.7]}
                    fillColor={getFillColor}
                    borderWidth={0.5}
                    borderColor="#111111"
                    onMouseMove={this.setFeature}
                    layers={[renderBackground, 'features', renderLegend(projects)]}
                    theme={theme}
                    tooltip={renderTooltip}
                    average={this.props.average}
                    tool={this.props.tool}
                />
            </div>
        )
    }
}

export default withPropsOnChange(['data'], ({ data }) => {
    const features = cloneDeep(countries.features)

    data.buckets.forEach(bucket => {
        const feature = features.find(f => f.properties.name === bucket.country)
        if (feature !== undefined) {
            feature.data = bucket
        } else {
            // console.error(`Unable to find matching feature for country: ${bucket.country}`)
        }
    })

    return { features }
})(ToolUsageByCountryMapChart)
