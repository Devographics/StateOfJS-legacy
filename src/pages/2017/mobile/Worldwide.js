import React from 'react'
import mobileData from '../../../data/mobile.json'
import WorldwideTemplate from '../../../components/templates/WorldwideTemplate'

export default () => (
    <WorldwideTemplate
        tools={mobileData.keys}
        countries={mobileData.countries}
        section="Mobile"
    />
)
