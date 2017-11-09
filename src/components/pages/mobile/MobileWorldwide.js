import React from 'react'
import mobileData from '../../../data/mobile.json'
import WorldwideUsage from '../../WorldwideUsage'

const MobileWorldwide = () => (
    <WorldwideUsage
        title="Mobile frameworks worldwide usage"
        tools={mobileData.keys}
        defaultTool="Native Apps"
        data={mobileData.experienceByUsers}
    />
)

export default MobileWorldwide
