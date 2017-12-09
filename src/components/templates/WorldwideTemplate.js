import React from 'react'
import WorldwideBlock from '../blocks/WorldwideBlock'
import Meta from '../elements/Meta'
import getPageTitle from '../../helpers/getPageTitle'
import DocumentTitle from 'react-document-title'

const WorldwideTemplate = props => (
	<DocumentTitle title={getPageTitle(props.section, 'worldwide')}>
	    <div className="template">
	        <Meta section={props.section} subSection="worldwide" />
	        <WorldwideBlock {...props} />
	    </div>
    </DocumentTitle>
)

export default WorldwideTemplate
