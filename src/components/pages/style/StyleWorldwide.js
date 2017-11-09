import React from 'react'
import styleData from '../../../data/style.json'
import WorldwideUsage from '../../WorldwideUsage'

const StyleWorldwide = () => (
    <WorldwideUsage
        title="Styling/CSS solutions worldwide usage"
        tools={styleData.keys}
        defaultTool="Plain CSS"
        data={styleData.experienceByUsers}
    />
)

export default StyleWorldwide
