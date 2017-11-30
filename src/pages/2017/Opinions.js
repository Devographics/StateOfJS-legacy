import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import TextBlock from '../../components/blocks/TextBlock'
import Newsletter from '../../components/common/Newsletter'

const text = `
We asked developers questions about their view of the current JavaScript ecosystem, 
but we haven't had time to analyze the data yet :(

If you'd like to know when this section comes out, sign up below and we'll
be sure to notify you. 
`

const Opinions = () => (
    <div>
        <TextBlock text={text} />
        <Newsletter />
    </div>
)

export default Opinions
