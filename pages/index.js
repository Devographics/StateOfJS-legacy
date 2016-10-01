import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'
import _ from 'lodash'
import TextBlock from '../components/blocks/TextBlock.js'
import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js'

import homeContents from '../data/home/home.md'

export default class Index extends React.Component {

  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = "//platform.twitter.com/widgets.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

  render () {
    return (
      <DocumentTitle title="The State Of JavaScript">
        <div className="results-container content home">
          <h1 className="logo"><img src="images/javascript9.svg" alt="The State Of JavaScript"/></h1>

          <div className="bubbles">
            <h3 className="bubble bubble-great"><img src="images/left-speech-bubble.svg"/><span>JavaScript is great!</span></h3>
            <h3 className="bubble bubble-mess"><img src="images/right-speech-bubble.svg"/><span>JavaScript is a mess!</span></h3>
          </div>

          <TextBlock contents={homeContents} className="intro section-border section-narrow" />

          <Stats />
          
          <Comments />

          <Share/>

        </div>
      </DocumentTitle>
    )
  }
}
