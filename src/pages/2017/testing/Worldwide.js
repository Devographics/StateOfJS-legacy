import React from 'react'
import testingData from '../../../data/testing.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={testingData.keys}
        countries={testingData.countries}
    />
)
