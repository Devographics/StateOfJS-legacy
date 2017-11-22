import React from 'react'
import styleData from '../../../data/style.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Styling/CSS solutions worldwide usage"
        tools={styleData.keys}
        countries={styleData.countries}
    />
)
