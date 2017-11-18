import React from 'react'
import flavorData from '../../../data/flavor.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="JavaScript flavors worldwide usage"
        tools={flavorData.keys}
        countries={flavorData.countries}
    />
)
