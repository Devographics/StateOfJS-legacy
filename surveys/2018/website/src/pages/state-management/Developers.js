import React from 'react'
import stateData from '../../data/state.json'
import DevelopersTemplate from '../../components/templates/DevelopersTemplate'

const StateUsers = () => (
    <DevelopersTemplate
        title="JavaScript state management tools users facts"
        tools={stateData.keys}
        defaultTool="REST API"
        data={stateData.experienceByUsers}
        section="State Management"
    />
)

export default StateUsers
