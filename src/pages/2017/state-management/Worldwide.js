import React from 'react'
import stateData from '../../../data/state.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="JavaScript state management tools worldwide usage"
        tools={stateData.keys}
        countries={stateData.countries}
    />
)
