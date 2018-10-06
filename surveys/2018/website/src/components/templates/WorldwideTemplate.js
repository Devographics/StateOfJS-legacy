import React from 'react'
import WorldwideBlock from '../blocks/WorldwideBlock'
import Meta from '../elements/Meta'
import getPageTitle from '../../helpers/getPageTitle'
import Layout from '../common/Layout'

const WorldwideTemplate = props => (
    <Layout {...props} title={getPageTitle(props.section, 'worldwide')}>
        <div className="template">
            <Meta section={props.section} subSection="worldwide" />
            <WorldwideBlock {...props} />
        </div>
    </Layout>
)

export default WorldwideTemplate
