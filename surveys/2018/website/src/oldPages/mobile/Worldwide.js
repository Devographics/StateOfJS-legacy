import React from 'react'
import mobileData from '../../data/mobile.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = () => (
    <WorldwideTemplate
        tools={mobileData.keys}
        countries={mobileData.countries}
        all={mobileData.experience}
        section="Mobile"
    />
)

export default Worldwide
