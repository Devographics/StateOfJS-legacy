import React, { memo, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { I18nContext } from 'core/i18n/i18nContext'
import { ResponsiveBar } from '@nivo/bar'
import { Chip, useTheme } from '@nivo/core'

// Define chart patterns
const patterns = [
    {
        id: 'empty',
        type: 'patternLines',
        background: 'transparent',
        color: 'inherit',
        rotation: -45,
        lineWidth: 4,
        spacing: 8
    }
]

// Custom labels using an extra `layer`,
// this way, we can add an extra outline to bar labels
const getLabels = mode => ({ bars, getLabelTextColor }) => {
    return bars.map(bar => {
        // skip legend for small bars
        if (bar.width < 60) return null

        let value = `${bar.data.value}`
        if (mode === 'percentage') value = `${value}%`

        // `pointerEvents: none` is used to not
        // disturb mouse events
        return (
            <g
                key={bar.key}
                transform={`translate(${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
                style={{ pointerEvents: 'none' }}
            >
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        strokeWidth: 3,
                        stroke: '#e0e4e4',
                        strokeLinejoin: 'round',
                        fontSize: 12,
                        fontWeight: 600
                    }}
                >
                    {value}
                </text>
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fill: getLabelTextColor(bar),
                        fontSize: 12,
                        fontWeight: 600
                    }}
                >
                    {value}
                </text>
            </g>
        )
    })
}

const Tooltip = memo(({ translate, i18nNamespace, bar }) => {
    const theme = useTheme()

    return (
        <div style={theme.tooltip.basic}>
            <Chip color={bar.color} style={{ marginRight: 7 }} />
            {translate(`${i18nNamespace}.${bar.id}`)}:{' '}
            <strong>{bar.data[`${bar.id}_count`]}</strong>
        </div>
    )
})

const GaugeBarChart = ({ buckets, mapping, mode, applyEmptyPatternTo, i18nNamespace }) => {
    const { translate } = useContext(I18nContext)

    const keys = useMemo(() => mapping.map(m => m.id), [mapping])
    const data = useMemo(
        () => [buckets.reduce((acc, bucket) => {
            const key = mapping.find(m => m.raw === bucket.id).id

            return {
                ...acc,
                [key]: bucket.percentage,
                [`${key}_count`]: bucket.count
            }
        }, {})],
        [buckets, mapping]
    )
    const colors = useMemo(
        () => {
            const colorById = mapping.reduce((acc, m) => ({
                ...acc,
                [m.id]: m.color,
            }), {})

            return bar => colorById[bar.id]
        },
        [mapping]
    )
    const labelsLayer = useMemo(() => getLabels(mode), [mode])
    const patternRules = useMemo(
        () => [{
            id: 'empty',
            match: { id: applyEmptyPatternTo },
        }],
        [applyEmptyPatternTo]
    )

    return (
        <ResponsiveBar
            data={data}
            keys={keys}
            layout="horizontal"
            indexBy={() => 'serie'}
            colors={colors}
            enableLabel={false}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.4]]
            }}
            axisLeft={null}
            axisBottom={null}
            enableGridX={false}
            enableGridY={false}
            animate={false}
            theme={theme}
            layers={['bars', labelsLayer]}
            defs={patterns}
            fill={patternRules}
            tooltip={bar => (
                <Tooltip
                    bar={bar}
                    translate={translate}
                    i18nNamespace={i18nNamespace}
                />
            )}
        />
    )
}

GaugeBarChart.propTypes = {
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    mapping: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            raw: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,
    mode: PropTypes.oneOf(['count', 'percentage']),
    applyEmptyPatternTo: PropTypes.string,
    i18nNamespace: PropTypes.string.isRequired
}

export default GaugeBarChart
