import React from 'react'
import frontendData from '../../../data/frontend.json'
import WorldwideBlock from '../../../components/blocks/WorldwideBlock'

export default () => (
    <WorldwideBlock
        title="Frontend frameworks worldwide usage"
        tools={frontendData.keys}
        countries={frontendData.countries}
    />
)
