import React from 'react'
import stateData from '../../../data/state.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const StateUsers = () => (
    <DevelopersBlock
        title="JavaScript state management tools users facts"
        tools={stateData.keys}
        defaultTool="REST API"
        data={stateData.experienceByUsers}
    />
)

export default StateUsers
