import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const BarChart = ({ data }) => (
    <ResponsiveBar
        data={data.reverse()}
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
            left: 10
        }}
        axisLeft={null}
        axisTop={{
            format: '.2s'
        }}
    />
)

BarChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default BarChart
