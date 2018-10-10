import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'

const LibraryTemplate = () => (
    <Layout>
        <div className="template">
            <Meta />
            <TextBlock text={'library template'} />
        </div>
    </Layout>
)

export default LibraryTemplate
