import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from 'nivo'
import { colorRange, yearsOfExperienceKeys, yearsOfExperienceShortKeys } from '../../constants'
import theme from '../../nivoTheme'

const YearsOfExperienceBar = ({ yearsOfExperience, mode, onSelect }) => {
    const data = yearsOfExperienceKeys.map(years => {
        const match = yearsOfExperience.find(({ key }) => key === years)

        return {
            id: years,
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
                colors={colorRange}
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
                    legend: 'years of experience',
                    legendOffset: 46,
                    legendPosition: 'center',
                    format: v => yearsOfExperienceShortKeys[v],
                }}
                theme={theme}
                onClick={node => onSelect(node.indexValue)}
            />
        </div>
    )
}

YearsOfExperienceBar.propTypes = {
    yearsOfExperience: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default YearsOfExperienceBar
