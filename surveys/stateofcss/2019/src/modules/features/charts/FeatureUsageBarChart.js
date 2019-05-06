import React from 'react'
import GaugeBarChart from 'core/charts/GaugeBarChart'
import { usage } from '../../../constants'

const FeatureUsageBarChart = ({ buckets }) => (
    <GaugeBarChart
        buckets={buckets}
        mapping={usage}
        mode="percentage"
        applyEmptyPatternTo="never_heard_not_sure"
        i18nNamespace="features.usage"
    />
)

export default FeatureUsageBarChart
