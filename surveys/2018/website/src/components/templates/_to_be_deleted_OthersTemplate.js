import React from 'react'
import BarBlock from '../blocks/BarBlock'
import OthersBubbleBlock from '../blocks/OthersBubbleBlock'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'
import SectionHeader from '../elements/SectionHeader'

const OthersTemplate = props => (
    <Layout {...props}>
        <div className="template">
            <Meta section={props.section} subSection="other" />
            <SectionHeader />
            <BarBlock {...props} />
            <OthersBubbleBlock {...props} />
        </div>
    </Layout>
)

export default OthersTemplate
