import React from 'react'
import ShareTwitter from './ShareTwitter'
import ShareEmail from './ShareEmail'
import ShareFacebook from './ShareFacebook'
import ShareLinkedIn from './ShareLinkedIn'
import { PageContextConsumer } from '../pages/pageContext'
import Trans from '../i18n/Trans'

const ShareSite = () => (
    <PageContextConsumer>
        {context => (
            <Trans>
                {translate => {
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
                }}
            </Trans>
        )}
    </PageContextConsumer>
)

export default ShareSite
