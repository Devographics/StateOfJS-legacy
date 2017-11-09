import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const AllUsagesBar = ({ data, mode }) => (
    <div style={{ height: 260 }}>
        <ResponsiveBar
            margin={{
                top: 10,
                right: 50,
                bottom: 30,
                left: 50,
            }}
            keys={['users']}
            layout="vertical"
            padding={0.8}
            data={data}
            maxValue={mode !== 'absolute' ? 100 : 'auto'}
            colors={colorRange}
            labelsTextColor="inherit:darker(1.4)"
            enableLabel={false}
            enableGridX={false}
            enableGridY={true}
            animate={true}
            motionStiffness={120}
            motionDamping={15}
            axisRight={{
                format: mode !== 'absolute' ? v => `${v}%` : '.2s',
            }}
            axisLeft={{
                format: mode !== 'absolute' ? v => `${v}%` : '.2s',
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: 10,
            }}
            theme={theme}
        />
    </div>
)

AllUsagesBar.propTypes = {
    data: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
}

export default AllUsagesBar
