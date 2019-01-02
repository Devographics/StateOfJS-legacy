import React from 'react'
import Newsletter from '../components/Newsletter'
import Trans from '../i18n/Trans'

const NewsletterBlock = () => (
    <Trans>
        {translate => (
            <div className="Block Block--Newsletter Newsletter">
                <h3 className="Newsletter__Heading">{translate('stay_tuned')}</h3>
                <div className="Newsletter__Description">{translate('leave_your_email')}</div>
                <Newsletter />
            </div>
        )}
    </Trans>
)

export default NewsletterBlock
