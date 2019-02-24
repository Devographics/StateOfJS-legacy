import { geoMercator, geoPath } from 'd3-geo'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { withDimensions, withTheme } from '@nivo/core'
import { GeoMapDefaultProps } from './props'

const projectionById = {
    mercator: geoMercator
}

export default (Component, displayName) =>
    setDisplayName(displayName)(
        compose(
            defaultProps(GeoMapDefaultProps),
            withTheme(),
            withDimensions(),
            withPropsOnChange(
                ['width', 'height', 'projectionType', 'projectionScale', 'projectionTranslation'],
                ({
                    width,
                    height,
                    projectionType,
                    projectionScale,
                    projectionTranslation: [translateX, translateY]
                }) => {
                    const projection = projectionById[projectionType]()
                        .scale(projectionScale)
                        .translate([width * translateX, height * translateY])
                        .rotate([-10, 0])

                    const pathHelper = geoPath(projection)

                    return { projection, pathHelper }
                }
            ),
            withPropsOnChange(
                ['fillColor', 'borderWidth', 'borderColor'],
                ({ fillColor, borderWidth, borderColor }) => ({
                    getFillColor: typeof fillColor === 'function' ? fillColor : () => fillColor,
                    getBorderWidth:
                        typeof borderWidth === 'function' ? borderWidth : () => borderWidth,
                    getBorderColor:
                        typeof borderColor === 'function' ? borderColor : () => borderColor
                })
            ),
            pure
        )(Component)
    )
