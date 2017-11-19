import React from 'react'
import testingData from '../../../data/testing.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Testing frameworks worldwide usage"
        tools={testingData.keys}
        countries={testingData.countries}
    />
)
