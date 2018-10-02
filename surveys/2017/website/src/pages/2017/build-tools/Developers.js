import React from 'react'
import buildData from '../../../data/build.json'
import DevelopersTemplate from '../../../components/templates/DevelopersTemplate'

const BuildUsers = () => (
    <DevelopersTemplate
        title="Build tools users facts"
        tools={buildData.keys}
        defaultTool="Webpack"
        data={buildData.experienceByUsers}
        section="Build Tools"
    />
)

export default BuildUsers
