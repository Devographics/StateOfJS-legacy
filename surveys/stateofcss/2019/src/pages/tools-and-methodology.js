import React from 'react'
import Layout from '../core/Layout'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'

const ToolsAndMethodologyPage = ({ data, ...rest }) => (
    <Layout {...rest}>
        <div>
            <PageHeader showIntro={false} />
            <TextBlock text="@todo" />
        </div>
    </Layout>
)

export default ToolsAndMethodologyPage
