import React from 'react'
import stateData from '../../../data/state.json'
import WorldwideUsage from '../../WorldwideUsage'

const StateWorldwide = () => (
    <WorldwideUsage
        title="JavaScript state management tools worldwide usage"
        tools={stateData.keys}
        defaultTool="REST API"
        data={stateData.experienceByUsers}
    />
)

export default StateWorldwide
