import React from 'react'
import flavorData from '../../data/flavor.json'
import DevelopersTemplate from '../../components/templates/DevelopersTemplate'

const FlavorUsers = props => (
    <DevelopersTemplate
        {...props}
        title="JavaScript flavors users facts"
        tools={flavorData.keys}
        defaultTool={'"Plain" JavaScript (ES5)'}
        data={flavorData.experienceByUsers}
        section="Flavors"
    />
)

export default FlavorUsers
