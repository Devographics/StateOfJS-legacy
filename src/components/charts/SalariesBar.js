import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { salaryKeys } from '../../constants'
import theme from '../../nivoTheme'

const SalariesBar = ({ data }) => (
    <div style={{ height: 300 }}>
        <ResponsiveBar
            margin={{
                top: 10,
                right: 0,
                bottom: 30,
                left: 50,
            }}
            layout="vertical"
            padding={0.7}
            maxValue={100}
            data={data}
            keys={salaryKeys}
            indexBy="tool"
            labelsTextColor="inherit:darker(1.4)"
            enableLabel={true}
            labelFormat={v => `${v}%`}
            enableGridX={false}
            enableGridY={true}
            animate={true}
            motionStiffness={120}
            motionDamping={15}
            axisLeft={{
                format: v => `${v}%`
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: 12
            }}
            theme={theme}
        />
    </div>
)

SalariesBar.propTypes = {
    data: PropTypes.array.isRequired,
    //onSelect: PropTypes.func.isRequired,
}

export default SalariesBar
