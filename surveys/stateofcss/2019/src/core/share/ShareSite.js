import React, { useContext } from 'react'
import ShareTwitter from './ShareTwitter'
import ShareEmail from './ShareEmail'
import ShareFacebook from './ShareFacebook'
import ShareLinkedIn from './ShareLinkedIn'
import { PageContext } from '../pages/pageContext'
import { I18nContext } from '../i18n/i18nContext'

const ShareSite = () => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const link = context.host
    const transOptions = {
        values: { link }
    }
    const title = translate('share.site.title', transOptions)
    const twitterText = translate('share.site.twitter_text', transOptions)
    const subject = translate('share.site.subject', transOptions)
    const body = translate('share.site.body', transOptions)

    return (
        <div className="ShareSite">
            <ShareTwitter text={twitterText} />
            <ShareFacebook link={link} />
            <ShareLinkedIn link={link} title={title} />
            <ShareEmail subject={subject} body={body} />
        </div>
    )
}

export default ShareSite
