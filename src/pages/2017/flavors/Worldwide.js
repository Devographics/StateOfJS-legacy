import React from 'react'
import flavorData from '../../../data/flavor.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="JavaScript flavors worldwide usage"
        tools={flavorData.keys}
        countries={flavorData.countries}
    />
)
