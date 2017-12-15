import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { opinionKeys, opinionColors, colorRange } from '../../constants'
import opinionData from '../../data/opinions.json'
import theme from '../../nivoTheme'

const containerStyle = { height: 200 }
const colorBy = d => opinionColors[d.indexValue]
const margin = {
    top: 0,
    right: 0,
    bottom: 40,
    left: 0,
}
const axisLeft = {
    tickSize: 0,
    tickPadding: 10,
}
const axisBottom = { format: '.2s' }

const OpinionBar = ({ opinion }) => {
    const data = opinionKeys.map(key => {
        const value = opinionData.aggs[opinion][key]

        return { id: key, [opinion]: value || 0 }
    })

    return (
        <div style={containerStyle}>
            <ResponsiveBar
                layout="vertical"
                padding={0.3}
                margin={margin}
                colors={colorRange}
                colorBy={colorBy}
                data={data}
                keys={[opinion]}
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

OpinionBar.propTypes = {
    opinion: PropTypes.string.isRequired,
}

export default OpinionBar
