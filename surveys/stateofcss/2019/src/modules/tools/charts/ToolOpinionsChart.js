import React from 'react'
import { opinions } from '../../../constants'
import GaugeBarChart from 'core/charts/GaugeBarChart'

const ToolOpinionsChart = ({ buckets }) => (
    <GaugeBarChart
        buckets={buckets}
        mapping={opinions}
        mode="percentage"
        applyEmptyPatternTo="never_heard"
        i18nNamespace="opinions.legends"
    />
)

export default ToolOpinionsChart
