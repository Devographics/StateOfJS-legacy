import React from 'react'
import buildData from '../../../data/build.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={buildData.keys}
        countries={buildData.countries}
        all={buildData.experience}
        section="Build Tools"
    />
)
