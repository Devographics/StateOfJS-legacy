import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import GeoMap from './GeoMap'

const ResponsiveGeoMap = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <GeoMap width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveGeoMap
