import React from 'react'
import frontendData from '../../../data/frontend.json'
import UsersFacts from '../../../components/UsersFacts'

const FrontendUsers = () => (
    <UsersFacts
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
    />
)

export default FrontendUsers
