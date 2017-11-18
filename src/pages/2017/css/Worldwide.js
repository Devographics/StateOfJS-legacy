import React from 'react'
import styleData from '../../../data/style.json'
import WorldwideUsage from '../../../components/WorldwideUsage'

export default () => (
    <WorldwideUsage
        title="Styling/CSS solutions worldwide usage"
        tools={styleData.keys}
        countries={styleData.countries}
    />
)
