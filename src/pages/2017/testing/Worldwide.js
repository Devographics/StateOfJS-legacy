import React from 'react'
import testingData from '../../../data/testing.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Testing frameworks worldwide usage"
        tools={testingData.keys}
        countries={testingData.countries}
    />
)
