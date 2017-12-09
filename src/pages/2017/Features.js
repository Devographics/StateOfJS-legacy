import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import Newsletter from '../../components/common/Newsletter'
import TextBlock from '../../components/blocks/TextBlock'
import getPageTitle from '../../helpers/getPageTitle'

const text = `
We asked developers questions about the features they value the most in a JavaScript
app, but we haven't had time to analyze the data yet :(

If you'd like to know when this section comes out, sign up below and we'll
be sure to notify you. 
`

const Features = () => (
    <DocumentTitle title={getPageTitle('Features')}>
	    <div>
	        <TextBlock text={text} />
	        <Newsletter />
	    </div>
    </DocumentTitle>
)

export default Features
