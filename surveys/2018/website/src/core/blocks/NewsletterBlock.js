import React from 'react'
import Newsletter from '../components/Newsletter'

const newsletterText = `
If you'd like to know when we release additional results or announce next year's edition, just leave us your email below:
`
const NewsletterBlock = () => (
    <div className="Block Block--Newsletter Newsletter">
        <h3 className="Newsletter__Heading">Stay Tuned</h3>
        <div className="Newsletter__Description">{newsletterText}</div>
        <Newsletter />
    </div>
)

export default NewsletterBlock
