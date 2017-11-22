import React from 'react'
import testingData from '../../../data/testing.json'
import DevelopersTemplate from '../../../components/templates/DevelopersTemplate'

const TestingUsers = () => (
    <DevelopersTemplate
        title="Testing frameworks users facts"
        tools={testingData.keys}
        defaultTool="Mocha"
        data={testingData.experienceByUsers}
    />
)

export default TestingUsers
