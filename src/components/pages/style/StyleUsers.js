import React from 'react'
import styleData from '../../../data/style.json'
import UsersFacts from '../../UsersFacts'

const StyleUsers = () => (
    <UsersFacts
        title="Styling/CSS solutions users facts"
        tools={styleData.keys}
        defaultTool="Plain CSS"
        data={styleData.experienceByUsers}
    />
)

export default StyleUsers
