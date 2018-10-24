import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import withPageData from '../../helpers/withPageData'
import { getWording } from '../../helpers/wording'

const trackShare = (platform, { section, subSection }) => () => {
    ReactGA.event({
        category: platform,
        action: `${section.label}/${subSection.label} chart share`
    })
}

const Twitter = ({ text, page }) => {
    return (
        <a
            onClick={trackShare('Twitter', page)}
            className="share__link--twitter share__link"
            href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label=""
        >
            <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
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
                            <path d="M23.444,4.834c-0.814,0.363-1.5,0.375-2.228,0.016c0.938-0.562,0.981-0.957,1.32-2.019c-0.878,0.521-1.851,0.9-2.886,1.104 C18.823,3.053,17.642,2.5,16.335,2.5c-2.51,0-4.544,2.036-4.544,4.544c0,0.356,0.04,0.703,0.117,1.036 C8.132,7.891,4.783,6.082,2.542,3.332C2.151,4.003,1.927,4.784,1.927,5.617c0,1.577,0.803,2.967,2.021,3.782 C3.203,9.375,2.503,9.171,1.891,8.831C1.89,8.85,1.89,8.868,1.89,8.888c0,2.202,1.566,4.038,3.646,4.456 c-0.666,0.181-1.368,0.209-2.053,0.079c0.579,1.804,2.257,3.118,4.245,3.155C5.783,18.102,3.372,18.737,1,18.459 C3.012,19.748,5.399,20.5,7.966,20.5c8.358,0,12.928-6.924,12.928-12.929c0-0.198-0.003-0.393-0.012-0.588 C21.769,6.343,22.835,5.746,23.444,4.834z" />
                        </g>
                    </svg>
                </div>
            </div>
        </a>
    )
}

Twitter.propTypes = {
    text: PropTypes.string.isRequired,
    page: PropTypes.object.isRequired
}

const Facebook = ({ link, page }) => {
    return (
        <a
            onClick={trackShare('Facebook', page)}
            className="share__link--facebook share__link"
            href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
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
}

Facebook.propTypes = {
    link: PropTypes.string.isRequired,
    page: PropTypes.object.isRequired
}

const Email = ({ subject, body, page }) => {
    return (
        <a
            onClick={trackShare('Email', page)}
            className="share__link--email share__link"
            href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
            target="_self"
            aria-label=""
        >
            <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small">
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
                        <path d="M22,4H2C0.897,4,0,4.897,0,6v12c0,1.103,0.897,2,2,2h20c1.103,0,2-0.897,2-2V6C24,4.897,23.103,4,22,4z M7.248,14.434 l-3.5,2C3.67,16.479,3.584,16.5,3.5,16.5c-0.174,0-0.342-0.09-0.435-0.252c-0.137-0.239-0.054-0.545,0.186-0.682l3.5-2 c0.24-0.137,0.545-0.054,0.682,0.186C7.571,13.992,7.488,14.297,7.248,14.434z M12,14.5c-0.094,0-0.189-0.026-0.271-0.08l-8.5-5.5 C2.997,8.77,2.93,8.46,3.081,8.229c0.15-0.23,0.459-0.298,0.691-0.147L12,13.405l8.229-5.324c0.232-0.15,0.542-0.084,0.691,0.147 c0.15,0.232,0.083,0.542-0.148,0.691l-8.5,5.5C12.189,14.474,12.095,14.5,12,14.5z M20.934,16.248 C20.842,16.41,20.673,16.5,20.5,16.5c-0.084,0-0.169-0.021-0.248-0.065l-3.5-2c-0.24-0.137-0.323-0.442-0.186-0.682 s0.443-0.322,0.682-0.186l3.5,2C20.988,15.703,21.071,16.009,20.934,16.248z" />
                    </svg>
                </div>
            </div>
        </a>
    )
}

Email.propTypes = {
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    page: PropTypes.object.isRequired
}

class ShareChart extends Component {
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
        const { currentPage, chart, className } = this.props
        const wordingProperties = currentPage.subSection && { tool: currentPage.subSection.label }
        const title = getWording(`charts.${chart}`, wordingProperties)
        const link = `${currentPage.url}${chart}`

        const twitterText = `#StateOfJS 2018 Results: ${title} ${link}`
        const subject = 'State Of JavaScript Survey Results'
        const body = `Here are some interesting survey results (${title}): ${link}`

        return (
            <div
                className={classNames(className, 'share-wrapper', {
                    'share-popup-visible': this.state.showOptions
                })}
            >
                <div className="share">
                    <div className="share-button button" onClick={this.toggleOptions}>
                        Share
                    </div>
                </div>
                <div className="share-popup">
                    <div className="share-options">
                        <Twitter text={twitterText} page={currentPage} />
                        <Facebook link={link} page={currentPage} />
                        <Email subject={subject} body={body} page={currentPage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withPageData(ShareChart)
