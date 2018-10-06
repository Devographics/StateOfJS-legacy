import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import getPageTitle from '../helpers/getPageTitle'
import Layout from '../components/common/Layout'

const text = `
Demographics intro TODO.
`

const Demographics = (props) => (
    <Layout {...props} title={getPageTitle('Demographics')}>
        <div>
            <TextBlock text={text} />
        </div>
    </Layout>
)

export default Demographics
