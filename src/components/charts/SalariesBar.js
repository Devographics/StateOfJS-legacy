import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { salaryKeys, colorScale } from '../../constants'
import theme from '../../nivoTheme'

const SalariesBar = ({ data }) => (
    <div className="salaries chart--bar" style={{ height: 300 }}>
        <ResponsiveBar
            margin={{
                top: 10,
                right: 0,
                bottom: 30,
                left: 50,
            }}
            colors={colorScale}
            layout="vertical"
            padding={0.5}
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
                format: v => `${v}%`,
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: 12,
            }}
            theme={theme}
            labelSkipHeight={15}
        />
    </div>
)

SalariesBar.propTypes = {
    data: PropTypes.array.isRequired,
    //onSelect: PropTypes.func.isRequired,
}

export default SalariesBar
