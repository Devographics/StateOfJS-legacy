import React from 'react'
import frontendData from '../../data/frontend.json'
import DevelopersTemplate from '../../components/templates/DevelopersTemplate'

const FrontendUsers = () => (
    <DevelopersTemplate
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
        section="Front-end"
    />
)

export default FrontendUsers
