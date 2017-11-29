import React from 'react'
import backendData from '../../../data/backend.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={backendData.keys}
        countries={backendData.countries}
        all={backendData.experience}
        section="Back-end"
    />
)
