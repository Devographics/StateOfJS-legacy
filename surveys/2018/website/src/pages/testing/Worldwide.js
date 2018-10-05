import React from 'react'
import testingData from '../../data/testing.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = () => (
    <WorldwideTemplate
        tools={testingData.keys}
        all={testingData.experience}
        countries={testingData.countries}
        section="Testing"
    />
)

export default Worldwide
