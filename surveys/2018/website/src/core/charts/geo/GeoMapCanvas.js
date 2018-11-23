import React, { Component } from 'react'
import { Container, getRelativeCursor } from '@nivo/core'
import { geoContains } from 'd3-geo'
import { GeoMapPropTypes } from './props'
import enhance from './enhance'

class GeoMapCanvas extends Component {
    static propTypes = GeoMapPropTypes

    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    getFeatureFromMouseEvent = event => {
        const { projection, features } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)
        return features.find(f => geoContains(f, projection.invert([x, y])))
    }

    handleMouseMove = (showTooltip, hideTooltip) => event => {
        const { isInteractive, onMouseMove, tooltip, theme } = this.props

        if (isInteractive !== true) return

        const feature = this.getFeatureFromMouseEvent(event)
        if (feature && tooltip) {
            const tooltipContent = tooltip(feature)
            if (!tooltipContent) {
                hideTooltip()
            } else {
                showTooltip(<div style={theme.tooltip.container}>{tooltipContent}</div>, event)
            }
        } else {
            hideTooltip()
        }
        onMouseMove(feature || null)
    }

    handleClick = event => {
        const { isInteractive, onClick } = this.props

        if (isInteractive !== true) return

        const feature = this.getFeatureFromMouseEvent(event)
        if (feature) {
            onClick(feature)
        }
    }

    draw(props) {
        const {
            pixelRatio,
            margin,
            outerWidth,
            outerHeight,
            theme,
            features,
            pathHelper,
            getFillColor,
            getBorderWidth,
            getBorderColor,
            layers
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        pathHelper.context(this.ctx)

        layers.forEach(layer => {
            if (layer === 'features') {
                features.forEach(feature => {
                    this.ctx.beginPath()
                    pathHelper(feature)
                    this.ctx.fillStyle = getFillColor(feature)
                    this.ctx.fill()

                    const borderWidth = getBorderWidth(feature)
                    if (borderWidth > 0) {
                        this.ctx.strokeStyle = getBorderColor(feature)
                        this.ctx.lineWidth = borderWidth
                        this.ctx.stroke()
                    }
                })
            } else {
                layer(this.ctx, props)
            }
        })
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                            cursor: isInteractive ? 'crosshair' : 'normal'
                        }}
                        onMouseMove={this.handleMouseMove(showTooltip, hideTooltip)}
                        onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

export default enhance(GeoMapCanvas, 'GeoMapCanvas')
