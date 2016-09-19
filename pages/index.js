import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import '../stylesheets/screen.scss'
import Intro from './_intro.md'
import About from './_about.md'
import Share from './_share.js'
import Newsletter from './_newsletter.js'

export default class Index extends React.Component {

  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = "//platform.twitter.com/widgets.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

  render () {
    return (
      <DocumentTitle title={config.siteTitle}>
        <div className="content home">
          <h1 className="logo"><img src="images/javascript9.svg" alt="The State Of JavaScript"/></h1>

          <div className="bubbles">
            <h3 className="bubble bubble-great"><img src="images/left-speech-bubble.svg"/><span>JavaScript is great!</span></h3>
            <h3 className="bubble bubble-mess"><img src="images/right-speech-bubble.svg"/><span>JavaScript is a mess!</span></h3>
          </div>

          <Intro className="section-block intro" />

          {/*
          <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Marc was almost ready to implement his &quot;hello world&quot; React app <a href="https://t.co/ptdg4yteF1">pic.twitter.com/ptdg4yteF1</a></p>&mdash; Thomas Fuchs (@thomasfuchs) <a href="https://twitter.com/thomasfuchs/status/708675139253174273">March 12, 2016</a></blockquote>
          */}

          <div className="section-block section-border spread-the-word">
            <h3>Help Spread the Word</h3>
            <Share/>
          </div>

          <div className="section-block spread-the-word">
            <h3>Get the Final Results</h3>
            <p>Leave your email here and you'll be notified when the results are published. </p>
            <Newsletter/>
          </div>

          <About className="section-block" />

        </div>
      </DocumentTitle>
    )
  }
}
