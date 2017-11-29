import React from 'react'
import frontendData from '../../../data/frontend.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={frontendData.keys}
        countries={frontendData.countries}
        all={frontendData.experience}
        section="Front-end"
    />
)
