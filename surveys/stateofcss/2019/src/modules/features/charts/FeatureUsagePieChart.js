import React from 'react'
import PropTypes from 'prop-types'
import { patternLinesDef } from '@nivo/core'
import { ResponsivePie } from '@nivo/pie'
import theme from 'nivoTheme'

const FeatureUsagePieChart = ({ feature }) => {
    return (
        <ResponsivePie
            theme={theme}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }}
            colors={['#3c52d1', '#5dd6da', '#cccccc']}
            innerRadius={0.6}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            defs={[
                patternLinesDef('lines', {
                    color: 'inherit',
                    background: 'transparent',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                })
            ]}
            borderWidth={2}
            borderColor="#ffffff"
            fill={[{ match: { id: 'never_heard_not_sure' }, id: 'lines' }]}
            data={[
                {
                    id: 'used_it',
                    label: 'used_it',
                    value: feature.usage.used_it
                },
                {
                    id: 'know_not_used',
                    label: 'know_not_used',
                    value: feature.usage.know_not_used
                },
                {
                    id: 'never_heard_not_sure',
                    label: 'never_heard_not_sure',
                    value: feature.usage.never_heard_not_sure
                }
            ]}
        />
    )
}

FeatureUsagePieChart.propTypes = {
    feature: PropTypes.shape({
        id: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        usage: PropTypes.shape({
            used_it: PropTypes.number.isRequired,
            know_not_used: PropTypes.number.isRequired,
            never_heard_not_sure: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
}

export default FeatureUsagePieChart
