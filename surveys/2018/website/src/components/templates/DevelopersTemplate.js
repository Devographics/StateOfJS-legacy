import React from 'react'
import SalariesBlock from '../blocks/SalariesBlock'
import ExperienceBlock from '../blocks/ExperienceBlock'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import getPageTitle from '../../helpers/getPageTitle'

const DevelopersTemplate = props => (
    <Layout {...props} title={getPageTitle(props.section, 'developers')}>
        <div className="template">
            <Meta section={props.section} subSection="developers" />
            <SalariesBlock {...props} />
            <ExperienceBlock {...props} />
        </div>
    </Layout>
)

export default DevelopersTemplate
