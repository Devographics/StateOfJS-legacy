import React from 'react'
import stateData from '../../../data/state.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={stateData.keys}
        countries={stateData.countries}
        section="State Management"
    />
)
