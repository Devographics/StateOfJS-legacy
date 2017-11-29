import React from 'react'
import flavorData from '../../../data/flavor.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={flavorData.keys}
        countries={flavorData.countries}
        all={flavorData.experience}
        section="Flavors"
    />
)
