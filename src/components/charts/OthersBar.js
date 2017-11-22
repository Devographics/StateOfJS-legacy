import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const OthersBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        indexBy="key"
        keys={['doc_count']}
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
            left: 20,
        }}
        axisLeft={null}
        axisTop={{
            format: '.2s',
        }}
    />
)

OthersBar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default OthersBar
