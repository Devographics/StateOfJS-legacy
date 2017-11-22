import React from 'react'
import buildData from '../../../data/build.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Build tools worldwide usage"
        tools={buildData.keys}
        countries={buildData.countries}
    />
)
