import React from 'react'
import stateData from '../../../data/state.json'
import UsersFacts from '../../../components/UsersFacts'

const StateUsers = () => (
    <UsersFacts
        title="JavaScript state management tools users facts"
        tools={stateData.keys}
        defaultTool="REST API"
        data={stateData.experienceByUsers}
    />
)

export default StateUsers
