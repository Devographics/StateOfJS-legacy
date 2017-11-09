import React from 'react'
import backendData from '../../../data/backend.json'
import UsersFacts from '../../UsersFacts'

const BackendUsers = () => (
    <UsersFacts
        title="Full-Stack frameworks users facts"
        tools={backendData.keys}
        defaultTool="Meteor"
        data={backendData.experienceByUsers}
    />
)

export default BackendUsers
