import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from '../../nivoTheme'
import { salaryRanges, colors } from '../../constants'
import { getWording } from '../../helpers/wording'

const margin = {
    top: 10,
    right: 40,
    bottom: 40,
    left: 40
}

const verticalAxis = {
    tickValues: 7,
    format: d => `${d}%`
}

const horizontalAxis = {
    format: d => getWording(`salary_range.${d}`)
}

const Tooltip = props => (
    <span>
        {getWording(`salary_range.${props.indexValue}`)}
        :&nbsp;
        <strong>{props.value}%</strong>
    </span>
)

export default class SalariesBarChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                range: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
                percentage: PropTypes.number.isRequired
            })
        ).isRequired
    }

    render() {
        const { data } = this.props

        const chartData = salaryRanges.map(range => data.find(d => d.range === range))

        return (
            <div
                style={{
                    height: 260
                }}
            >
                <ResponsiveBar
                    theme={theme}
                    colors={[colors.blue]}
                    margin={margin}
                    padding={0.4}
                    maxValue={30}
                    keys={['percentage']}
                    indexBy="range"
                    data={chartData}
                    labelFormat={d => `${d}%`}
                    labelTextColor="#111"
                    enableGridX={false}
                    enableGridY={true}
                    gridYValues={[0, 5, 10, 15, 20, 25, 30]}
                    axisRight={verticalAxis}
                    axisLeft={verticalAxis}
                    axisBottom={horizontalAxis}
                    animate={false}
                    tooltip={Tooltip}
                />
            </div>
        )
    }
}
