import React from 'react'
import frontendData from '../../../data/frontend.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

const FrontendWorldwide = () => (
    <WorldwideUsage
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
    />
)

export default FrontendWorldwide
