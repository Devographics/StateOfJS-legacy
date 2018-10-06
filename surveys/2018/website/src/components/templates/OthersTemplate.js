import React from 'react'
import OthersBarBlock from '../blocks/OthersBarsBlock'
import OthersBubbleBlock from '../blocks/OthersBubbleBlock'
import Meta from '../elements/Meta'
import getPageTitle from '../../helpers/getPageTitle'
import Layout from '../common/Layout'

const OthersTemplate = props => (
    <Layout {...props} title={getPageTitle(props.section, 'other')}>
        <div className="template">
            <Meta section={props.section} subSection="other" />
            <OthersBarBlock {...props} />
            <OthersBubbleBlock {...props} />
        </div>
    </Layout>
)

export default OthersTemplate
