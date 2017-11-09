import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { colorRange, salaryKeys, salaryShortKeys } from '../../constants'
import theme from '../../nivoTheme'

const SalariesBar = ({ salaries, mode, onSelect }) => {
    const data = salaryKeys.map(salary => {
        const match = salaries.find(({ key }) => key === salary)

        return {
            id: salary,
            users: match ? match.doc_count : 0,
        }
    })

    return (
        <div style={{ height: 260 }}>
            <ResponsiveBar
                margin={{
                    top: 10,
                    right: 0,
                    bottom: 60,
                    left: 50,
                }}
                layout="vertical"
                padding={0.7}
                maxValue={mode !== 'absolute' ? 100 : 'auto'}
                data={data}
                keys={['users']}
                indexBy="id"
                colors={[colorRange[1]]}
                labelsTextColor="inherit:darker(1.4)"
                enableLabel={false}
                enableGridX={false}
                enableGridY={true}
                animate={true}
                motionStiffness={120}
                motionDamping={15}
                axisLeft={{
                    format: mode !== 'absolute' ? v => `${v}%` : '.2s',
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 8,
                    legend: 'salary range',
                    legendOffset: 46,
                    legendPosition: 'center',
                    format: v => salaryShortKeys[v],
                }}
                theme={theme}
                onClick={node => onSelect(node.indexValue)}
            />
        </div>
    )
}

SalariesBar.propTypes = {
    salaries: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default SalariesBar
