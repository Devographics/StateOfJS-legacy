import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const OthersBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        indexBy="name"
        keys={['count']}
        layout="horizontal"
        padding={0.4}
        colors={colorRange}
        enableGridX={true}
        enableGridY={false}
        theme={theme}
        margin={{
            top: 30,
            right: 10,
            bottom: 30,
            left: 200
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legendPosition": "center",
            "legendOffset": -40
        }}
        axisTop={{
            format: '.2s'
        }}
    />
)

OthersBar.propTypes = {
    data: PropTypes.array.isRequired
}

export default OthersBar
