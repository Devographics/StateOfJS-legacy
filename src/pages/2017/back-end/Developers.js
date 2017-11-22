import React from 'react'
import backendData from '../../../data/backend.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const BackendUsers = () => (
    <DevelopersBlock
        title="Full-Stack frameworks users facts"
        tools={backendData.keys}
        defaultTool="Meteor"
        data={backendData.experienceByUsers}
    />
)

export default BackendUsers
