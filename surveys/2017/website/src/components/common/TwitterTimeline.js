// see https://github.com/uraway/react-twitter-embedded-timeline/blob/master/src/TwitterTimeline.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class TwitterTimeline extends React.Component {
    static propTypes = {
        query: PropTypes.string,
        widgetId: PropTypes.string,
        user: PropTypes.string,
        chrome: PropTypes.string,
        limit: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.state = { initialized: false }
    }

    componentDidMount() {
        if (this.state.initialized) {
            return
        }

        if (typeof twttr === 'undefined') {
            const twittertimeline = ReactDOM.findDOMNode(this.refs.twittertimeline) // eslint-disable-line
            const twitterscript = document.createElement('script') // eslint-disable-line no-undef
            twitterscript.src = '//platform.twitter.com/widgets.js'
            twitterscript.async = true
            twitterscript.id = 'twitter-wjs'
            twittertimeline.parentNode.appendChild(twitterscript)
        } else {
            twttr.widgets.load() // eslint-disable-line no-undef
        }

        this.initialized()
    }

    initialized() {
        this.setState({ initialized: true })
    }

    render() {
        const { query, widgetId } = this.props
        return (
            <div className="twitter-timeline-inner">
                <a
                    ref="twittertimeline" // eslint-disable-line react/no-string-refs
                    className="twitter-timeline"
                    href={`https://twitter.com/search?q=${query}`}
                    data-chrome="nofooter noheader"
                    data-widget-id={widgetId}
                    height={500}
                />
            </div>
        )
    }
}
