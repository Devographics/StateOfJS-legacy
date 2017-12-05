import React from 'react'
import PropTypes from 'prop-types'
import clone from 'lodash/clone'
import { ResponsiveBar } from '@nivo/bar'
import { colorRange } from '../../constants'
import theme from '../../nivoTheme'

const LocationsBar = ({ locations, mode }) => {
    const sortedLocations = clone(locations)
        .filter(({ key }) => key !== 'undefined')
        .reverse()

    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                margin={{
                    top: 10,
                    right: 20,
                    bottom: 30,
                    left: 140,
                }}
                layout="horizontal"
                padding={0.6}
                maxValue={mode !== 'absolute' ? 100 : 'auto'}
                data={sortedLocations}
                keys={['doc_count']}
                indexBy="key"
                colors={colorRange}
                labelsTextColor="inherit:darker(1.4)"
                enableLabel={false}
                enableGridX={true}
                enableGridY={false}
                animate={true}
                motionStiffness={120}
                motionDamping={15}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 12,
                }}
                axisBottom={{
                    format: mode !== 'absolute' ? v => `${v}%` : '.2s',
                }}
                theme={theme}
            />
        </div>
    )
}

LocationsBar.propTypes = {
    locations: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
}

export default LocationsBar
