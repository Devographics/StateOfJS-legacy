import React from 'react'
import SalariesBlock from '../blocks/SalariesBlock'
import ExperienceBlock from '../blocks/ExperienceBlock'
import Meta from '../elements/Meta'
import DocumentTitle from 'react-document-title'
import getPageTitle from '../../helpers/getPageTitle'

const DevelopersTemplate = (props) => (
	<DocumentTitle title={getPageTitle(props.section, 'developers')}>
	    <div className="template">
	        <Meta section={props.section} subSection="developers" />
	        <SalariesBlock {...props} />
	        <ExperienceBlock {...props} />
	    </div>
    </DocumentTitle>
)

export default DevelopersTemplate
