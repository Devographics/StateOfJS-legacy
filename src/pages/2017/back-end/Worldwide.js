import React from 'react'
import backendData from '../../../data/backend.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Full-Stack frameworks worldwide usage"
        tools={backendData.keys}
        countries={backendData.countries}
    />
)
