import React, { memo, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { I18nContext } from 'core/i18n/i18nContext'
import { colors } from '../../constants'

const Tooltip = memo(({ translate, indexValue, value }) => (
    <span>
        {translate(`opinion_scale.step.${indexValue}`)}
        :&nbsp;
        <strong>{value}</strong>
    </span>
))

const scaleLabel = translate => value => {
    if (value === '1' || value === '3') return null

    return translate(`opinion_scale.step.${value}`)
}

const Emojis = ({ bars }) => (
    <>
        <text
            x={bars[0].x + bars[0].width / 2}
            y={bars[0].y - 16}
            textAnchor="middle"
            style={{
                fontSize: 24
            }}
        >
            😔
        </text>
        <text
            x={bars[2].x + bars[2].width / 2}
            y={bars[2].y - 16}
            textAnchor="middle"
            style={{
                fontSize: 24
            }}
        >
            😐
        </text>
        <text
            x={bars[4].x + bars[4].width / 2}
            y={bars[4].y - 16}
            textAnchor="middle"
            style={{
                fontSize: 24
            }}
        >
            😉
        </text>
    </>
)

const OpinionScaleBarChart = ({ buckets }) => {
    const { translate } = useContext(I18nContext)
    const data = useMemo(
        () => [0, 1, 2, 3, 4].map(step => {
            const bucket = buckets.find(b => b.id === `${step}`)
            if (bucket === undefined) {
                return {
                    id: `${step}`,
                    count: 0,
                    percentage: 0
                }
            }

            return bucket
        }),
        [buckets]
    )
    const getScaleTickLabel = scaleLabel(translate)

    return (
        <div style={{ height: 280 }}>
            <ResponsiveBar
                data={data}
                keys={['count']}
                layout="vertical"
                margin={{
                    top: 40,
                    right: 40,
                    bottom: 40,
                    left: 40,
                }}
                enableLabel={false}
                theme={theme}
                colors={[colors.blue]}
                borderWidth={2}
                borderColor={{ from: 'color' }}
                defs={[
                    {
                        id: 'neutral',
                        type: 'patternLines',
                        background: 'transparent',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 4,
                        spacing: 8
                    },
                ]}
                fill={[{
                    id: 'neutral',
                    match: { indexValue: '2' }
                }]}
                padding={0.6}
                enableGridX={false}
                enableGridY={true}
                gridYValues={5}
                axisLeft={{
                    format: '.2s',
                    tickValues: 5
                }}
                axisRight={{
                    format: '.2s',
                    tickValues: 5
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 15,
                    format: getScaleTickLabel,
                }}
                tooltip={barProps => <Tooltip translate={translate} {...barProps}/>}
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    Emojis,
                ]}
                animate={false}
            />
        </div>
    )
}

OpinionScaleBarChart.propTypes = {
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    )
}

export default memo(OpinionScaleBarChart)
