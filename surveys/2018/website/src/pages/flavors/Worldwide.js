import React from 'react'
import flavorData from '../../data/flavor.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = (props) => (
    <WorldwideTemplate
        {...props}
        tools={flavorData.keys}
        countries={flavorData.countries}
        all={flavorData.experience}
        section="Flavors"
    />
)

export default Worldwide
