import React from 'react'
import Layout from '../components/common/Layout'
import TextBlock from '../components/blocks/TextBlock'

const Introduction = () => (
    <Layout title="Page Not Found" showPagination={false}>
        <div>
            <TextBlock text={`404 not found`} />
        </div>
    </Layout>
)

export default Introduction
