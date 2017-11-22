import React from 'react'
import stateData from '../../../data/state.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="JavaScript state management tools worldwide usage"
        tools={stateData.keys}
        countries={stateData.countries}
    />
)
