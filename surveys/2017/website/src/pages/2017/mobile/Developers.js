import React from 'react'
import mobileData from '../../../data/mobile.json'
import DevelopersTemplate from '../../../components/templates/DevelopersTemplate'

const MobileUsers = () => (
    <DevelopersTemplate
        title="Mobile frameworks users facts"
        tools={mobileData.keys}
        defaultTool="Native Apps"
        data={mobileData.experienceByUsers}
        section="Mobile"
    />
)

export default MobileUsers
