import React from 'react'
import buildData from '../../../data/build.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Build tools worldwide usage"
        tools={buildData.keys}
        countries={buildData.countries}
    />
)
