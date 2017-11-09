import React from 'react'
import testingData from '../../../data/testing.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

const TestingWorldwide = () => (
    <WorldwideUsage
        title="Testing frameworks worldwide usage"
        tools={testingData.keys}
        defaultTool="Mocha"
        data={testingData.experienceByUsers}
    />
)

export default TestingWorldwide
