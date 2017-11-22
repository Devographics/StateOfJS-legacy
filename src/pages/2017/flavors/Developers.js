import React from 'react'
import flavorData from '../../../data/flavor.json'
import DevelopersTemplate from '../../../components/templates/DevelopersTemplate'

const FlavorUsers = () => (
    <DevelopersTemplate
        title="JavaScript flavors users facts"
        tools={flavorData.keys}
        defaultTool={'"Plain" JavaScript (ES5)'}
        data={flavorData.experienceByUsers}
    />
)

export default FlavorUsers
