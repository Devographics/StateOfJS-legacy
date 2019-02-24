import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import GeoMapCanvas from './GeoMapCanvas'

const ResponsiveGeoMapCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <GeoMapCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveGeoMapCanvas
