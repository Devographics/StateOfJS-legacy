import React from 'react'
import flavorData from '../../../data/flavor.json'
import WorldwideUsage from '../../WorldwideUsage'

const FlavorWorldwide = () => (
    <WorldwideUsage
        title="JavaScript flavors worldwide usage"
        tools={flavorData.keys}
        defaultTool={'"Plain" JavaScript (ES5)'}
        data={flavorData.experienceByUsers}
    />
)

export default FlavorWorldwide
