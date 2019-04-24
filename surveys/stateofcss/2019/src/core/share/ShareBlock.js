import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import { I18nContext } from '../i18n/i18nContext'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import { PageContext } from '../helpers/pageContext'
import ShareTwitter from './ShareTwitter'
import ShareLinkedIn from './ShareLinkedIn'
import ShareFacebook from './ShareFacebook'
import ShareEmail from './ShareEmail'

const ShareBlock = ({ section, id, className, toggleClass }) => {
    const [showOptions, setShowOptions] = useState(false)
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const toggleOptions = e => {
        e.preventDefault()
        // toggle parent component's class
        toggleClass && toggleClass()
        setShowOptions(!showOptions)
        ReactGA.event({
            category: 'Clicks',
            action: `${section} chart toggle`
        })
    }

    const meta = getBlockMeta(id, context, translate)

    return (
        <div
            className={classNames(className, 'share-wrapper', {
                'share-popup-visible': showOptions
            })}
        >
            <div className="share">
                <div
                    className="share-button button"
                    onClick={e => {
                        toggleOptions(e)
                    }}
                >
                    {translate('share')}
                </div>
            </div>
            <div className="share-popup">
                <div className="share-options">
                    <ShareTwitter text={meta.twitterText} trackingId={meta.trackingId} />
                    <ShareFacebook link={meta.link} trackingId={meta.trackingId} />
                    <ShareLinkedIn
                        link={meta.link}
                        title={meta.title}
                        trackingId={meta.trackingId}
                    />
                    <ShareEmail
                        subject={meta.emailSubject}
                        body={meta.emailBody}
                        trackingId={meta.trackingId}
                    />
                </div>
            </div>
        </div>
    )
}

ShareBlock.propTypes = {
    id: PropTypes.string.isRequired
}

export default ShareBlock
