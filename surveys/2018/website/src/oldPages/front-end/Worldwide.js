import React from 'react'
import frontendData from '../../data/frontend.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = () => (
    <WorldwideTemplate
        tools={frontendData.keys}
        countries={frontendData.countries}
        all={frontendData.experience}
        section="Front-end"
    />
)

export default Worldwide
