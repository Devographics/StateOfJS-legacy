import React from 'react'
import flavorData from '../../../data/flavor.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const FlavorUsers = () => (
    <DevelopersBlock
        title="JavaScript flavors users facts"
        tools={flavorData.keys}
        defaultTool={'"Plain" JavaScript (ES5)'}
        data={flavorData.experienceByUsers}
    />
)

export default FlavorUsers
