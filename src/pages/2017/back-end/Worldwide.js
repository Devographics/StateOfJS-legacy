import React from 'react'
import backendData from '../../../data/backend.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Full-Stack frameworks worldwide usage"
        tools={backendData.keys}
        countries={backendData.countries}
    />
)
