import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import TextBlock from '../../components/blocks/TextBlock'
import Newsletter from '../../components/common/Newsletter'

const newsletterText = `
If you'd like to know when we release additional results or announce next year's edition, just leave us your email below:
`

const Conclusion = () => (
    <DocumentTitle title="Conclusion">
        <div>
            <div>Conclusion</div>

            <div className="block block--newsletter">
                <TextBlock title="Stay Tuned" text={newsletterText} />
                <Newsletter />
            </div>
        </div>
    </DocumentTitle>
)

export default Conclusion
