import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { featureKeys, featureColors, colorRange } from '../../constants'
import featuresData from '../../data/features.json'
import theme from '../../nivoTheme'

const containerStyle = { height: 200 }
const colorBy = d => featureColors[d.indexValue]
const margin = {
    top: 0,
    right: 10,
    bottom: 30,
    left: 230,
}
const axisLeft = {
    tickSize: 0,
    tickPadding: 10,
}
const axisBottom = { format: '.2s' }

const FeatureBar = ({ feature }) => {
    const data = featureKeys.map(key => {
        const value = featuresData.aggs[feature][key]

        return { id: key, [feature]: value || 0 }
    })

    return (
        <div style={containerStyle}>
            <ResponsiveBar
                layout="horizontal"
                padding={0.3}
                margin={margin}
                colors={colorRange}
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
            />
        </div>
    )
}

FeatureBar.propTypes = {
    feature: PropTypes.string.isRequired,
}

export default FeatureBar
