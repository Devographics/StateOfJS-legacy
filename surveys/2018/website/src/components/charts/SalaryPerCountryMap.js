import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import withPropsOnChange from 'recompose/withPropsOnChange'
import countries from '../../data/geo/world_countries'
import ResponsiveGeoMap from './geo/ResponsiveGeoMapCanvas'

class SalaryPerCountryMap extends Component {
    static propTypes = {}

    state = {
        feature: null
    }

    setFeature = feature => {
        this.setState({ feature })
    }

    getFillColor = () => {
        return '#333'
    }

    renderBackground = (ctx, props) => {
        ctx.fillStyle = '#111111'
        ctx.fillRect(0, 0, props.outerWidth, props.outerWidth)
    }

    render() {
        const { features } = this.props

        return (
            <div className="SalaryPerCountry__Chart">
                <ResponsiveGeoMap
                    features={features}
                    projectionType="mercator"
                    projectionScale={120}
                    projectionTranslation={[0.5, 0.7]}
                    fillColor={this.getFillColor}
                    borderWidth={0.5}
                    borderColor="#111111"
                    onMouseMove={this.setFeature}
                    layers={[this.renderBackground, 'features']}
                />
            </div>
        )
    }
}

export default withPropsOnChange(['data'], () => {
    const features = cloneDeep(countries.features)

    return { features }
})(SalaryPerCountryMap)
