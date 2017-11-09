import React from 'react'
import buildData from '../../../data/build.json'
import WorldwideUsage from '../../WorldwideUsage'

const BuildWorldwide = () => (
    <WorldwideUsage
        title="Build tools worldwide usage"
        tools={buildData.keys}
        defaultTool="Webpack"
        data={buildData.experienceByUsers}
    />
)

export default BuildWorldwide
