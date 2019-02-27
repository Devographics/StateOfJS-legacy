import React from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

const FeaturesScatterplotChart = ({ features }) => {
    return (
        <div style={{ height: 400 }}>
            <ResponsiveScatterPlot
                theme={theme}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 80
                }}
                colors={['#3c52d1', '#5dd6da', '#cccccc']}
                xScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto'
                }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto'
                }}
                axisLeft={{
                    tickPadding: 14,
                    legend: '% of users aware of the feature',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: v => `${v}%`
                }}
                axisBottom={{
                    tickPadding: 14,
                    legend: 'number of participants who used the feature',
                    legendPosition: 'middle',
                    legendOffset: 54
                }}
                symbolSize={24}
                data={[
                    {
                        id: 'stats',
                        data: features.map(f => {
                            return {
                                featureId: f.id,
                                x: f.usage.used_it,
                                y: ((f.usage.used_it + f.usage.know_not_used) / f.total) * 100
                            }
                        })
                    }
                ]}
                tooltip={d => <strong>{d.featureId}</strong>}
            />
        </div>
    )
}

FeaturesScatterplotChart.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            usage: PropTypes.shape({
                used_it: PropTypes.number.isRequired,
                know_not_used: PropTypes.number.isRequired,
                never_heard_not_sure: PropTypes.number.isRequired
            }).isRequired,
            resources: PropTypes.shape({}).isRequired
        })
    ).isRequired
}

export default FeaturesScatterplotChart
