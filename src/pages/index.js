import React from 'react'
import Link from 'gatsby-link'
import DocumentTitle from 'react-document-title'

// import ReactGA from 'react-ga'

import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'
import PreviousYears from '../components/common/PreviousYears.js'
import TakeSurvey from '../components/common/TakeSurvey.js'

import TextBlock from '../components/blocks/TextBlock.js'
// import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js'
import About from '../components/common/About.js'

import Newsletter from '../components/common/Newsletter'

// import FooterContents from '../data/footer.md'

const homeContents = `
<strong className="dropcap">T</strong>he JavaScript world could use a bit of classification.

In 2017 this survey helped us do just that, by collecting data from over 20,000 developers to identify current and upcoming trends. 

This year, we're asking for your help once more to find out which libraries developers want to learn next, which have the best satisfaction ratings, and much more. 
`

const homeComingSoonContents = `
We collected data from over 20,000 developers, asking them questions on topics ranging from front-end frameworks to testing libraries and more. 

We're now processing the data. Leave us your email below if you'd like to know as soon as the results are published. 
`

const newsletterContents = `
Leave us your email and we'll let you know when next year's survey comes out. 
`

export default class Index extends React.Component {
  render () {
    return (
      <DocumentTitle title="The State Of JavaScript 2018">
        <div className="results-container content home">
          {/* <div className="bubbles">
            <h3 className="bubble bubble-great">
              <img alt="JavaScript is great!" src="images/left-speech-bubble.svg" />
              <span>JavaScript is great!</span>
            </h3>
            <h3 className="bubble bubble-mess">
              <img alt="JavaScript is a mess!" src="images/right-speech-bubble.svg" />
              <span>JavaScript is a mess!</span>
            </h3>
          </div> */}

          <div className="intro section-narrow section-border">
            <TextBlock text={homeComingSoonContents} />
            {/* <TakeSurvey /> */}
          </div>
          {/* <Stats />*/}

          <PreviousYears />

          <Share />

          {/* <Comments /> */}

          <div className="section block block--newsletter--home">
            <TextBlock title="Stay Tuned" text={newsletterContents} />
            <Newsletter />
          </div>

          <About />

          <div className="footer home-footer">
            <TextBlock>
              <p>
                                Hand-coded in Osaka, Japan with <a href="http://nivo.rocks">Nivo</a>{' '}
                                & <a href="https://www.gatsbyjs.org/">Gatsby</a>. Extra data from{' '}
                <a href="https://bestofjs.org/">Best of JavaScript</a>
                                .&nbsp;
                                <a href="https://github.com/StateOfJS/StateOfJS">Leave an issue</a>
                                &nbsp;or&nbsp;
                                <a href="mailto:hello@stateofjs.com">Get in touch</a>.
                            </p>
            </TextBlock>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
