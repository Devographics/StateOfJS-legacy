import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { featureKeys, featureColors, colorRange } from '../../constants'
import featuresData from '../../data/features.json'
import theme from '../../nivoTheme'
import sumObject from '../../helpers/sumObject'

const containerStyle = { height: 200 }
const colorBy = d => featureColors[d.indexValue]
const margin = {
    top: 0,
    right: 0,
    bottom: 40,
    left: 0
}
const axisLeft = {
    tickSize: 0,
    tickPadding: 10
}
const axisBottom = {}

const FeatureBar = ({ feature }) => {
    const total = sumObject(featuresData.aggs[feature])
    const data = featureKeys.map(key => {
        const value = featuresData.aggs[feature][key]
        const percent = Math.round((value * 100) / total)
        return { id: key, [feature]: percent || 0 }
    })

    return (
        <div style={containerStyle}>
            <ResponsiveBar
                layout="vertical"
                padding={0.3}
                margin={margin}
                colors={colorRange}
                labelFormat={v => `${v}%`}
                colorBy={colorBy}
                data={data}
                keys={[feature]}
                labelsTextColor="inherit:darker(1.6)"
                enableGridX={false}
                enableGridY={false}
                isInteractive={false}
                animate={false}
                axisLeft={axisLeft}
                axisBottom={axisBottom}
                theme={theme}
                indexBy="id"
            />
        </div>
    )
}

FeatureBar.propTypes = {
    feature: PropTypes.string.isRequired
}

export default FeatureBar
