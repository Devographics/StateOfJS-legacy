import React from 'react'
import buildData from '../../../data/build.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const BuildUsers = () => (
    <DevelopersBlock
        title="Build tools users facts"
        tools={buildData.keys}
        defaultTool="Webpack"
        data={buildData.experienceByUsers}
    />
)

export default BuildUsers
