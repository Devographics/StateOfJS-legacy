import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import Trans from '../i18n/Trans'
import { getBlockMeta } from 'core/blocks/blockHelpers'
import { PageContextConsumer } from '../pages/pageContext'
import ShareTwitter from './ShareTwitter'
import ShareLinkedIn from './ShareLinkedIn'
import ShareFacebook from './ShareFacebook'
import ShareEmail from './ShareEmail'

export default class ShareBlock extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired
    }

    constructor() {
        super()

        this.state = {
            showOptions: false
        }
    }

    toggleOptions = e => {
        e.preventDefault()
        // toggle parent component's class
        this.props.toggleClass && this.props.toggleClass()
        this.setState({
            showOptions: !this.state.showOptions
        })
        ReactGA.event({
            category: 'Clicks',
            action: `${this.props.section} chart toggle`
        })
    }

    render() {
        return (
            <PageContextConsumer>
                {context => (
                    <Trans>
                        {translate => {
                            const { id, className } = this.props

                            const meta = getBlockMeta(id, context, translate)

                            return (
                                <div
                                    className={classNames(className, 'share-wrapper', {
                                        'share-popup-visible': this.state.showOptions
                                    })}
                                >
                                    <div className="share">
                                        <div
                                            className="share-button button"
                                            onClick={this.toggleOptions}
                                        >
                                            {translate('share')}
                                        </div>
                                    </div>
                                    <div className="share-popup">
                                        <div className="share-options">
                                            <ShareTwitter
                                                text={meta.twitterText}
                                                trackingId={meta.trackingId}
                                            />
                                            <ShareFacebook
                                                link={meta.link}
                                                trackingId={meta.trackingId}
                                            />
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
                        }}
                    </Trans>
                )}
            </PageContextConsumer>
        )
    }
}
