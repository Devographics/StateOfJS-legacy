import React from 'react'
import frontendData from '../../../data/frontend.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

const FrontendWorldwide = () => (
    <WorldwideUsage
        title="Frontend frameworks worldwide usage"
        tools={frontendData.keys}
        defaultTool="React"
        data={frontendData.experienceByUsers}
    />
)

export default FrontendWorldwide
