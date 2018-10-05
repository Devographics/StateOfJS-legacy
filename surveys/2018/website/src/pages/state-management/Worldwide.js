import React from 'react'
import stateData from '../../data/state.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = () => (
    <WorldwideTemplate
        tools={stateData.keys}
        countries={stateData.countries}
        all={stateData.experience}
        section="State Management"
    />
)

export default Worldwide
