import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../blocks/OthersBarsBlock'
import OthersBubbleBlock from '../blocks/OthersBubbleBlock'
import * as dto from '../../dto'
import frontendData from '../../data/frontend.json'
import Meta from '../elements/Meta'
import getPageTitle from '../../helpers/getPageTitle'
import DocumentTitle from 'react-document-title'

const OthersTemplate = props => (
	<DocumentTitle title={getPageTitle(props.section, 'others')}>
	    <div className="template">
	        <Meta section={props.section} subSection="others" />
	        <OthersBarBlock {...props} />
	        <OthersBubbleBlock {...props} />
	    </div>
    </DocumentTitle>
)

export default OthersTemplate
