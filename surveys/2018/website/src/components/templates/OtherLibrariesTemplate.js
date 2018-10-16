import React from 'react'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import TextBlock from '../blocks/TextBlock'
import SectionHeader from '../elements/SectionHeader'

const OtherLibrariesTemplate = () => (
    <Layout>
        <div className="template">
            <Meta />
            <SectionHeader />
            <TextBlock text={'Other Libraries template'} />
        </div>
    </Layout>
)

export default OtherLibrariesTemplate
