import React from 'react'
import backendData from '../../../data/backend.json'
import DevelopersTemplate from '../../../components/templates/DevelopersTemplate'

const BackendUsers = () => (
    <DevelopersTemplate
        title="Full-Stack frameworks users facts"
        tools={backendData.keys}
        defaultTool="Meteor"
        data={backendData.experienceByUsers}
        section="Back-end"
    />
)

export default BackendUsers
