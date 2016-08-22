import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import './example.scss'
import intro from './intro.md'
import about from './about.md'
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
        <div>
          <h1 className="logo"><img src="images/javascript9.svg" alt="The State Of JavaScript"/></h1>
          
          <div className="bubbles">
            <h3 className="bubble bubble-great">JavaScript is great!</h3>
            <h3 className="bubble bubble-mess">JavaScript is a mess!</h3>
          </div>

          <div className="section-block intro" dangerouslySetInnerHTML={{ __html: intro.body }} />

          {/*
          <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Marc was almost ready to implement his &quot;hello world&quot; React app <a href="https://t.co/ptdg4yteF1">pic.twitter.com/ptdg4yteF1</a></p>&mdash; Thomas Fuchs (@thomasfuchs) <a href="https://twitter.com/thomasfuchs/status/708675139253174273">March 12, 2016</a></blockquote>
          */}

          <div className="section-block take-survey">
            <a className="take-survey-button" href="https://stateofjs.typeform.com/to/aYkckG">Take the Survey</a>
          </div>
          
          <div className="section-block section-border spread-the-word">
            <h3>Help Spread the Word</h3>
            <Share/>
          </div>

          <div className="section-block spread-the-word">
            <h3>Get the Results</h3>
            <p>Leave your email here and you'll be notified when the results are published. </p>
            <Newsletter/>
          </div>

          <div className="section-block" dangerouslySetInnerHTML={{ __html: about.body }} />

        </div>
      </DocumentTitle>
    )
  }
}
