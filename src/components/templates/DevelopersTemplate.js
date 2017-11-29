import React from 'react'
import SalariesBlock from '../blocks/SalariesBlock'
import ExperienceBlock from '../blocks/ExperienceBlock'
import Meta from '../elements/Meta'

const DevelopersTemplate = props => (
    <div className="template">
        <Meta section={props.section} subSection="developers" />
        <SalariesBlock {...props} />
        <ExperienceBlock {...props} />
    </div>
)

export default DevelopersTemplate
