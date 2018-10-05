import React from 'react'
import DocumentTitle from 'react-document-title'
import TextBlock from '../components/blocks/TextBlock'
import getPageTitle from '../helpers/getPageTitle'

const intro = `
A few years back, a JavaScript survey would've been a simple matter. Question 1: are you using jQuery? Question 2: any comments? Boom, done! 

But as we all know, things have changed. The JavaScript ecosystem is richer than ever, and even the most experienced developer can start to hesitate when considering the multitude of options available at every stage. 

This is where this survey comes in: we asked over a hundred questions to more than 28,000 developers all over the world, covering topics going from front-end libraries all the way to back-end frameworks.

We believe the result is the most complete picture of the state of JavaScript currently available, and we're excited to share it with you!

P.S. if all this data ever feels overwhelming, I'm sure you'll find a way to <em>console</em> yourself…
`

const Introduction = () => (
    <DocumentTitle title={getPageTitle('Introduction')}>
        <div>
            <TextBlock text={intro} />
        </div>
    </DocumentTitle>
)

export default Introduction
