import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubbleHtml } from 'nivo'
import { colors, DIVERGENCE_MAX_OFFSET, DIVERGENCE_COLORS } from '../../constants'
import { scaleLinear } from 'd3-scale'

const colorScale = scaleLinear()
    .domain([-DIVERGENCE_MAX_OFFSET, 0, DIVERGENCE_MAX_OFFSET])
    .range(DIVERGENCE_COLORS)

const NodeComponent = ({ node, style, handlers }) => {
    if (style.r <= 0) return null

    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: style.color,
                color: style.labelTextColor,
                borderWidth: style.borderWidth,
                borderColor: style.borderColor,
                top: style.y - style.r,
                left: style.x - style.r,
                width: style.r * 2,
                height: style.r * 2,
                borderStyle: 'solid',
                borderRadius: style.r,
                cursor: 'pointer',
            }}
            {...handlers}
        >
            {node.label !== false && node.label}
        </div>
    )
}

NodeComponent.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.shape({
        r: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        fill: PropTypes.string,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        labelTextColor: PropTypes.string.isRequired,
    }).isRequired,
    handlers: PropTypes.object.isRequired,
}

export default class CountryBubble extends PureComponent {
    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.shape({
            key: PropTypes.string.isRequired,
        }).isRequired,
        showDivergence: PropTypes.bool.isRequired,
    }

    render() {
        const { keys, data, showDivergence } = this.props

        const getColor = ({ depth, divergence }) => {
            if (depth === 0) return colors.greyLight
            if (showDivergence === false) return DIVERGENCE_COLORS[1]
            return colorScale(divergence)
        }

        return (
            <ResponsiveBubbleHtml
                isZoomable={false}
                colorBy={getColor}
                labelTextColor="inherit:darker(2)"
                labelSkipRadius={15}
                padding={2}
                nodeComponent={NodeComponent}
                animate={false}
                root={{
                    id: data.key,
                    children: keys.map(key => ({
                        id: key,
                        value: data[key].doc_count,
                        percentage: data[key].percentage,
                        divergence: data[key].divergence,
                    })),
                }}
            />
        )
    }
}
