import React from 'react'
import buildData from '../../../data/build.json'
import UsersFacts from '../../../components/UsersFacts'

const BuildUsers = () => (
    <UsersFacts
        title="Build tools users facts"
        tools={buildData.keys}
        defaultTool="Webpack"
        data={buildData.experienceByUsers}
    />
)

export default BuildUsers
