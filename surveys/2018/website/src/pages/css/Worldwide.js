import React from 'react'
import styleData from '../../data/style.json'
import WorldwideTemplate from '../../components/templates/WorldwideTemplate'

const Worldwide = () => (
    <WorldwideTemplate
        tools={styleData.keys}
        countries={styleData.countries}
        all={styleData.experience}
        section="CSS"
    />
)

export default Worldwide
