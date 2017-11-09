import React from 'react'
import mobileData from '../../../data/mobile.json'
import UsersFacts from '../../UsersFacts'

const MobileUsers = () => (
    <UsersFacts
        title="Mobile frameworks users facts"
        tools={mobileData.keys}
        defaultTool="Native Apps"
        data={mobileData.experienceByUsers}
    />
)

export default MobileUsers
