import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'

const OverviewTemplate = () => (
    <Layout>
        <div className="template">
            <Meta />
            <TextBlock text={'Overview template'} />
        </div>
    </Layout>
)

export default OverviewTemplate
