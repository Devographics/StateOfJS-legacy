import React from 'react'
import frontendData from '../../../data/frontend.json'
import UsersFacts from '../../UsersFacts'

const FrontendUsers = () => (
    <UsersFacts
        title="Frontend frameworks users facts"
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
    />
)

export default FrontendUsers
