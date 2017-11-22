import React from 'react'
import styleData from '../../../data/style.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const StyleUsers = () => (
    <DevelopersBlock
        title="Styling/CSS solutions users facts"
        tools={styleData.keys}
        defaultTool="Plain CSS"
        data={styleData.experienceByUsers}
    />
)

export default StyleUsers
