import React from 'react'
import mobileData from '../../../data/mobile.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Mobile frameworks worldwide usage"
        tools={mobileData.keys}
        countries={mobileData.countries}
    />
)
