import React from 'react'
import SalariesBlock from '../blocks/SalariesBlock'
import ExperienceBlock from '../blocks/ExperienceBlock'

const DevelopersTemplate = props => {
    return (
        <div className="content-wrapper">
            <SalariesBlock {...props}/>
            <ExperienceBlock {...props}/>
        </div>
    )
}

export default DevelopersTemplate
