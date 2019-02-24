import React, { useContext } from 'react'
import Newsletter from '../components/Newsletter'
import { I18nContext } from '../i18n/i18nContext'

const NewsletterBlock = () => {
    const { translate } = useContext(I18nContext)

    return (
        <div className="Block Block--Newsletter Newsletter">
            <h3 className="Newsletter__Heading">{translate('stay_tuned')}</h3>
            <div className="Newsletter__Description">{translate('leave_your_email')}</div>
            <Newsletter />
        </div>
    )
}

export default NewsletterBlock
