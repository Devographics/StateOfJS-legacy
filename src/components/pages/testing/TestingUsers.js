import React from 'react'
import testingData from '../../../data/testing.json'
import UsersFacts from '../../UsersFacts'

const TestingUsers = () => (
    <UsersFacts
        title="Testing frameworks users facts"
        tools={testingData.keys}
        defaultTool="Mocha"
        data={testingData.experienceByUsers}
    />
)

export default TestingUsers
