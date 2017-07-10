import React from 'react'
import bowser from 'bowser'
import axios from 'axios'

const getOS = () => {
  const detectedOS = []
  const osList = ['mac', 'windows', 'windowsphone', 'linux', 'chromeos', 'android', 'ios', 'ipod', 'ipad', 'iphone', 'blackberry', 'firefoxos', 'webos', 'touchpad', 'bada', 'tizen', 'sailfish']

  osList.forEach(os => {
    if (bowser[os]) {
      detectedOS.push(os)
    }
  })

  return detectedOS.join(',')
}

const getDevice = () => {
  const detectedDevices = []
  const deviceList = ['mobile', 'tablet']

  deviceList.forEach(device => {
    if (bowser[device]) {
      detectedDevices.push(device)
    }
  })

  if (detectedDevices.length === 0) {
    detectedDevices.push('desktop')
  }

  return detectedDevices.join(',')
}

export default class TakeSurvey extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    // const script = document.createElement("script");
    // script.src = "//platform.twitter.com/widgets.js";
    // script.async = true;
    // document.body.appendChild(script);
    axios.get('http://freegeoip.net/json/').then(response => {
      // console.log(response)
      this.setState({
        location: response.data.country_name,
        city: response.data.city
      })
    }).catch(error => {
      console.log(error)
    })

    const browserInfo = {
      device: getDevice(),
      browser: bowser.name,
      version: bowser.version,
      os: getOS(),
      referrer: document.referrer,
      gaId: ga.getAll()[0].get('clientId')
    }
    this.setState(browserInfo)
  }

  render () {
    return (
      <div className="take-survey">
          <a className="button large-button" href={`https://stateofjs.typeform.com/to/S5iLk9?gaid=${this.state.gaId}&referrer=${this.state.referrer}&city=${this.state.city}&location=${this.state.location}&device=${this.state.device}&browser=${this.state.browser}&version=${this.state.version}&os=${this.state.os}`}>Take the Survey</a>
          
          <p className="take-survey-note">Note: to improve the relevancy of the results, we keep track of anonymous information such as your referrer, location, device, browser, and OS.</p>
      </div>
    )
  }
}
