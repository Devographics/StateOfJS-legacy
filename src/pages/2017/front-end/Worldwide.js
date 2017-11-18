import React from 'react'
import frontendData from '../../../data/frontend.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Frontend frameworks worldwide usage"
        tools={frontendData.keys}
        countries={frontendData.countries}
    />
)
