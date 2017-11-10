import React from 'react'
import flavorData from '../../../data/flavor.json'
import UsersFacts from '../../../components/UsersFacts'

const FlavorUsers = () => (
    <UsersFacts
        title="JavaScript flavors users facts"
        tools={flavorData.keys}
        defaultTool={'"Plain" JavaScript (ES5)'}
        data={flavorData.experienceByUsers}
    />
)

export default FlavorUsers
