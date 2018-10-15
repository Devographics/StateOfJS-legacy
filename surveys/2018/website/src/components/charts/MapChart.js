import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import { geoMercator, geoPath } from 'd3-geo'
import continents from '../../data/geo/continent'
import MapChartContinent from './MapChartContinent'

const continentsFeatures = continents.features.reduce((acc, f) => {
    const continent = acc.find(d => d.continent === f.properties.continent)
    if (continent === undefined) {
        return [...acc, { continent: f.properties.continent, features: [f] }]
    }

    continent.features.push(f)

    return acc
}, [])

export default class MapChart extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        renderOverlay: PropTypes.func,
        renderContinentOverlay: PropTypes.func
    }

    static defaultProps = {
        height: 500
    }

    state = {
        dimensions: {
            width: -1,
            height: -1
        }
    }

    render() {
        const { renderContinentOverlay, height: _baseHeight } = this.props
        const { width, height } = this.state.dimensions

        const projection = geoMercator()
            .scale(120)
            .translate([width * 0.5, height * 0.7])
            .rotate([-10, 0])

        const path = geoPath(projection)

        const shouldRenderMap = width > 0 && height > 0

        return (
            <Measure
                bounds
                onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds })
                }}
            >
                {({ measureRef }) => (
                    <div
                        ref={measureRef}
                        style={{
                            height: _baseHeight,
                            marginBottom: 30
                        }}
                    >
                        {shouldRenderMap && (
                            <div
                                style={{
                                    position: 'relative'
                                }}
                            >
                                <svg
                                    width={width}
                                    height={height}
                                    style={{
                                        background: '#000',
                                        zIndex: 0
                                    }}
                                >
                                    <g>
                                        {continentsFeatures.map(continent => {
                                            return (
                                                <MapChartContinent
                                                    key={continent.continent}
                                                    continent={continent.continent}
                                                    path={path}
                                                    features={continent.features}
                                                />
                                            )
                                        })}
                                    </g>
                                </svg>
                                <div
                                    style={{
                                        pointerEvents: 'none',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width,
                                        height,
                                        zIndex: 1
                                    }}
                                >
                                    {renderContinentOverlay !== undefined &&
                                        continentsFeatures.map(continent => {
                                            return (
                                                <Fragment key={continent.continent}>
                                                    {renderContinentOverlay({
                                                        continent: continent.continent,
                                                        path,
                                                        centroid: path.centroid(
                                                            continent.features[0]
                                                        )
                                                    })}
                                                </Fragment>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Measure>
        )
    }
}
