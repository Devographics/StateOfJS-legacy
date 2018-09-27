import React from 'react'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const OtherToolBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        indexBy="key"
        keys={['doc_count']}
        layout="horizontal"
        padding={0.3}
        margin={{
            top: 30,
            right: 10,
            bottom: 30,
            left: 120
        }}
        enableGridX={true}
        enableGridY={false}
        axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            format: v => truncate(v, { length: 16 })
        }}
        axisTop={{ format: '.2s' }}
        axisBottom={{ format: '.2s' }}
        colors={colorRange}
        theme={theme}
    />
)

OtherToolBar.propTypes = {
    data: PropTypes.array.isRequired
}

export default OtherToolBar
