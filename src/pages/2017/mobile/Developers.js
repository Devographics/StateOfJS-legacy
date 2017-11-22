import React from 'react'
import mobileData from '../../../data/mobile.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const MobileUsers = () => (
    <DevelopersBlock
        title="Mobile frameworks users facts"
        tools={mobileData.keys}
        defaultTool="Native Apps"
        data={mobileData.experienceByUsers}
    />
)

export default MobileUsers
