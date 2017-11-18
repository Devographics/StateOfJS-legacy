import React from 'react'
import mobileData from '../../../data/mobile.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Mobile frameworks worldwide usage"
        tools={mobileData.keys}
        countries={mobileData.countries}
    />
)
