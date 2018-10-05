import React from 'react'
import styleData from '../../data/style.json'
import DevelopersTemplate from '../../components/templates/DevelopersTemplate'

const StyleUsers = () => (
    <DevelopersTemplate
        title="Styling/CSS solutions users facts"
        tools={styleData.keys}
        defaultTool="Plain CSS"
        data={styleData.experienceByUsers}
        section="CSS"
    />
)

export default StyleUsers
