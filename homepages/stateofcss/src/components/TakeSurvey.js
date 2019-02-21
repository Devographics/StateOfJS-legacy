import React from 'react'
import bowser from 'bowser'
// import ReactGA from 'react-ga'
import qs from 'qs'

export default class TakeSurvey extends React.Component {
    constructor() {
        super()
        this.state = {
            showWarning: false
        }
    }

    componentDidMount() {
        /*

        Disable location and GA id for better GDPR compliance

        */

        // setTimeout(() => {
        //     // geo tracking
        //     if (typeof geoip2 !== 'undefined') {
        //         // eslint-disable-next-line no-undef
        //         geoip2.city(
        //             result => {
        //                 this.setState({
        //                     location: result.country.names.en,
        //                     city: result.city.names.en
        //                 })
        //             },
        //             error => {
        //                 console.log(error)
        //             }
        //         )
        //     }

        //     // ga id
        //     if (ReactGA.ga() && ReactGA.ga().getAll) {
        //         this.setState({
        //             gaId: ReactGA.ga()
        //                 .getAll()[0]
        //                 .get('clientId')
        //         })
        //     }
        // }, 600)

        // eslint-disable-next-line no-undef
        const browser = bowser.getParser(window.navigator.userAgent)
        const info = browser.parse().parsedResult

        // eslint-disable-next-line no-undef
        const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true })

        // browser data
        const browserData = {
            device: info.platform.type,
            browser: info.browser.name,
            version: info.browser.version,
            os: info.os.name,
            // eslint-disable-next-line no-undef
            referrer: document.referrer,
            source: queryString.source
        }

        this.setState(browserData)
    }

    getSurveyUrl = () => {
        return `http://stateofjs.typeform.com/to/TxDuh6?browser=${this.state.browser}&version=${
            this.state.version
        }&os=${this.state.os}&referrer=${this.state.referrer}&device=${this.state.device}&source=${this.state.source}`
    }

    showWarning = event => {
        event.preventDefault()
        this.setState({ showWarning: true })
    }

    closeWarning = event => {
        event.preventDefault()
        this.setState({ showWarning: false })
    }

    render() {
        return (
            <div className="Block Block--takeSurvey TakeSurvey">
                {this.state.device === 'mobile' ? (
                    <a className="TakeSurvey__Button" href="#" onClick={this.showWarning}>
                        Take Survey
                    </a>
                ) : (
                    <a className="TakeSurvey__Button" href={this.getSurveyUrl()}>
                        Take Survey
                    </a>
                )}
                <p className="TakeSurvey__Note">
                    Note: to improve results relevance, we keep track of data such as your referrer,
                    device, browser, and OS.
                </p>
                {this.state.showWarning && (
                    <div className="TakeSurvey__MobileWarning">
                        <h3>A Note for Mobile Users</h3>
                        <p>
                            Some users have reported poor performance or even a non-working survey
                            form on mobile devices.{' '}
                        </p>

                        <p>
                            Sadly, this is outside our control as we rely on a hosted survey
                            service.
                        </p>
                        <p>
                            So until we figure out what’s going on, if you do experience any such
                            issues we suggest coming back later and filling out the survey on a
                            desktop device.{' '}
                        </p>
                        <a
                            className="TakeSurvey__Button TakeSurvey__Button--warning"
                            href={this.getSurveyUrl()}
                        >
                            Proceed to Survey
                        </a>
                        <a
                            className="TakeSurvey__MobileWarning__Cancel"
                            href="#"
                            onClick={this.closeWarning}
                        >
                            Go Back
                        </a>
                    </div>
                )}
            </div>
        )
    }
}
