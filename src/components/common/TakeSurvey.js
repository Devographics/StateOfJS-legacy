import React from 'react';
import bowser from 'bowser';
import ReactGA from 'react-ga';

export default class TakeSurvey extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

    setTimeout(() => {

      // geo tracking
      if (typeof geoip2 !== 'undefined') {
        geoip2.city(
          result => {
            this.setState({
              location: result.country.names.en,
              city: result.city.names.en,
            });
          },
          error => {
            console.log(error);
          }
        );
      }

      // ga id
      if (ReactGA.ga() && ReactGA.ga().getAll) {
        this.setState({
          gaId: ReactGA.ga()
            .getAll()[0]
            .get('clientId'),
        });
      }
    }, 200);

    const browser = bowser.getParser(window.navigator.userAgent);
    const info = browser.parse().parsedResult;

    // browser data
    const browserData = {
      device: info.platform.type,
      browser: info.browser.name,
      version: info.browser.version,
      os: info.os.name,
      referrer: document.referrer,
    };

    this.setState(browserData);
  }

  render() {
    return (
      <div className="take-survey">
        <a
          className="button large-button"
          href={`https://stateofjs.typeform.com/to/k77B5T?browser=${this.state.browser}&version=${
            this.state.version
          }&os=${this.state.os}&referrer=${this.state.referrer}&city=${this.state.city}&location=${
            this.state.location
          }&device=${this.state.device}&gaid=${this.state.gaId}`}
        >
          Take Survey
        </a>

        <p className="take-survey-note">
          Note: to improve results relevance, we keep track of data such as your referrer, location, device, browser,
          and OS.
        </p>
      </div>
    );
  }
}
