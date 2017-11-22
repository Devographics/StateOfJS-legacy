import React from 'react'
import testingData from '../../../data/testing.json'
import DevelopersBlock from '../../../components/blocks/DevelopersBlock'

const TestingUsers = () => (
    <DevelopersBlock
        title="Testing frameworks users facts"
        tools={testingData.keys}
        defaultTool="Mocha"
        data={testingData.experienceByUsers}
    />
)

export default TestingUsers
