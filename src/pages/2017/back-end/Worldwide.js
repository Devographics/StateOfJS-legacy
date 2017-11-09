import React from 'react'
import backendData from '../../../data/backend.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

const BackendWorldwide = () => (
    <WorldwideUsage
        title="Full-Stack frameworks worldwide usage"
        tools={backendData.keys}
        defaultTool="Meteor"
        data={backendData.experienceByUsers}
    />
)

export default BackendWorldwide
