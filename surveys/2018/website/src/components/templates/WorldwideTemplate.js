import React from 'react'
import WorldwideBlock from '../blocks/WorldwideBlock'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'

const WorldwideTemplate = props => (
    <Layout {...props}>
        <div className="template">
            <Meta section={props.section} subSection="worldwide" />
            <WorldwideBlock {...props} />
        </div>
    </Layout>
)

export default WorldwideTemplate
