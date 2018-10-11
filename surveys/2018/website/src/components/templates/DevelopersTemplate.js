import React from 'react'
import SalariesBlock from '../blocks/SalariesBlock'
import ExperienceBlock from '../blocks/ExperienceBlock'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'

const DevelopersTemplate = props => (
    <Layout {...props} >
        <div className="template">
            <Meta section={props.section} subSection="developers" />
            <SalariesBlock {...props} />
            <ExperienceBlock {...props} />
        </div>
    </Layout>
)

export default DevelopersTemplate
