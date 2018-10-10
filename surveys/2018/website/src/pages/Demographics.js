import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'

const text = `
Demographics intro TODO.
`

const Demographics = (props) => (
    <Layout {...props} >
        <div>
            <TextBlock text={text} />
        </div>
    </Layout>
)

export default Demographics
