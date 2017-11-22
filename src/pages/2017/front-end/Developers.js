import React from 'react'
import frontendData from '../../../data/frontend.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const FrontendUsers = () => (
    <DevelopersBlock
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
    />
)

export default FrontendUsers
