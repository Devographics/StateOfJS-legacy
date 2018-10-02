import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { opinionKeys, opinionColors, opinionLabels, colorRange } from '../../constants'
import opinionData from '../../data/opinions.json'
import theme from '../../nivoTheme'
import sumObject from '../../helpers/sumObject'

const containerStyle = { height: 200 }
const colorBy = d => opinionColors[d.indexValue]
const margin = {
    top: 0,
    right: 0,
    bottom: 40,
    left: 0
}
const axisBottom = {
    format: v => opinionLabels[v]
}

const OpinionBar = ({ opinion }) => {
    const total = sumObject(opinionData.aggs[opinion])
    const data = opinionKeys.map(key => {
        const value = opinionData.aggs[opinion][key]
        const percent = Math.round((value * 100) / total)
        return { id: opinionKeys[key], [opinion]: percent || 0 }
    })

    return (
        <div style={containerStyle}>
            <ResponsiveBar
                layout="vertical"
                padding={0.3}
                margin={margin}
                colors={colorRange}
                colorBy={colorBy}
                labelFormat={v => `${v}%`}
                data={data}
                keys={[opinion]}
                labelsTextColor="inherit:darker(1.6)"
                enableGridX={false}
                enableGridY={false}
                isInteractive={false}
                animate={false}
                axisBottom={axisBottom}
                theme={theme}
            />
        </div>
    )
}

OpinionBar.propTypes = {
    opinion: PropTypes.string.isRequired
}

export default OpinionBar
