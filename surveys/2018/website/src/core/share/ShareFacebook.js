import React from 'react'
import PropTypes from 'prop-types'
import track from './tracking'

const ShareFacebook = ({ link, trackingId }) => (
    <a
        onClick={track('Facebook', trackingId)}
        className="share__link--facebook share__link"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
    >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
            <div
                aria-hidden="true"
                className="resp-sharing-button__icon resp-sharing-button__icon--solid"
            >
                <svg
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    enableBackground="new 0 0 24 24"
                    xmlSpace="preserve"
                >
                    <g>
                        <path d="M18.768,7.465H14.5V5.56c0-0.896,0.594-1.105,1.012-1.105s2.988,0,2.988,0V0.513L14.171,0.5C10.244,0.5,9.5,3.438,9.5,5.32 v2.145h-3v4h3c0,5.212,0,12,0,12h5c0,0,0-6.85,0-12h3.851L18.768,7.465z" />
                    </g>
                </svg>
            </div>
        </div>
    </a>
)

ShareFacebook.propTypes = {
    link: PropTypes.string.isRequired,
    trackingId: PropTypes.string
}

export default ShareFacebook
