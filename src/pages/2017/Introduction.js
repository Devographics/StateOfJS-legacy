import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import TextBlock from '../../components/blocks/TextBlock'
import Newsletter from '../../components/common/Newsletter'

const intro = `
A few years back, a JavaScript survey would've been a simple matter. Question 1: are you using jQuery? Question 2: any comments? Boom, done. 

But as we all know, things have changed. The JavaScript ecosystem is richer than ever, and even the most experienced developer can start to falter when considering the multitude of options available at every stage. 

This is where this survey comes in: we asked over a hundred questions to more than 28,000 developers all over the world, covering topics going from front-end libraries all the way to back-end frameworks.

We belive the result is the most complete picture of the present state of JavaScript currently available. 

– Sacha, Michael, & Raphael

`

const newsletter = `
If you'd like to know when we release additional results or announce next year's edition, just leave us your email below:
`

const Introduction = () => (
    <DocumentTitle title="Introduction">
    	<div>
        <TextBlock text={intro} />

        <div className="newsletter">
	        <TextBlock title="Stay Tuned" text={newsletter} />

	    	<Newsletter/>
    	</div>
    	</div>
    </DocumentTitle>
)

export default Introduction
