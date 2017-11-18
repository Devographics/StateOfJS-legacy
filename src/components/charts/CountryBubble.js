import React from 'react'
import { ResponsiveBubble } from 'nivo'
import { colors } from '../../constants'

const CountryBubble = ({ keys, data }) => (
    <ResponsiveBubble
        isZoomable={false}
        colorBy={({ depth }) => {
            return depth === 1 ? colors.purple : colors.greyLight
        }}
        root={{
            id: data.key,
            children: keys.map(key => ({
                id: key,
                value: data[key].doc_count
            }))
        }}
    />
)

export default CountryBubble