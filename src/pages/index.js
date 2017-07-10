import React from 'react'
// import Link from 'gatsby-link'
import DocumentTitle from 'react-document-title'

import bowser from 'bowser'
import axios from 'axios'
import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'

import TextBlock from '../components/blocks/TextBlock.js'
import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js'

import homeContents from '../../data/home/home.md'


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

export default class Index extends React.Component {

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
    }
    this.setState(browserInfo)
  }

  render () {
    return (
      <DocumentTitle title="The State Of JavaScript">
        <div className="results-container content home">
        

          <TextBlock contents={homeContents} className="intro section-border section-narrow" />

          <a href={`https://stateofjs.typeform.com/to/S5iLk9?city=${this.state.city}&location=${this.state.location}&device=${this.state.device}&browser=${this.state.browser}&version=${this.state.version}&os=${this.state.os}`}>Take survey</a>
          
          <Stats />
          
          <Comments />

          <Share/>

        </div>
      </DocumentTitle>
    )
  }
}
