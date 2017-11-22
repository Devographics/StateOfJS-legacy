import React from 'react'
import styleData from '../../../data/style.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={styleData.keys}
        countries={styleData.countries}
    />
)
