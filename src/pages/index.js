import React from 'react';
import Link from 'gatsby-link';
import DocumentTitle from 'react-document-title';

// import ReactGA from 'react-ga'

import '../stylesheets/screen.scss';
import Share from '../components/common/Share.js';
import PreviousYears from '../components/common/PreviousYears.js';

import TextBlock from '../components/blocks/TextBlock.js';
// import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js';
import About from '../components/common/About.js';

import Newsletter from '../components/common/Newsletter';

// import FooterContents from '../data/footer.md'

const homeContents = `
The JavaScript world is richer and messier than ever.

So we collected data from over 20,000 developers, asking them questions on topics ranging from front-end frameworks and state management, to build tools and testing libraries.

You'll find out which libraries developers want to learn next, and which have the best satisfaction ratings. And hopefully, get a better understanding of the ever-changing JavaScript ecosystem.
`;

const homeComingSoonContents = `
We collected data from over 20,000 developers, asking them questions on topics ranging from front-end frameworks to testing libraries and more. 

We're almost ready to release the results to the world. So join us on December 12, 2017 at 5pm PST for a special launch livestream.
`;

const newsletterContents = `
Leave us your email and we'll let you know when next year's survey comes out. 
`;

export default class Index extends React.Component {
  render () {
    return (
      <DocumentTitle title="The State Of JavaScript 2017">
        <div className="results-container content home">
          <h1 className="logo section-narrow">
            <img src="images/stateofjs2018.svg" alt="The State Of JavaScript" />
            {/*<div className="logo-1"/>
            <div className="logo-2"/>*/}
          </h1>

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

          <div className="intro section-narrow">
            <TextBlock text={homeContents} />
            <div className="take-survey">
              <Link className="button large-button" to="/2017/introduction/">
                Take Survey
              </Link>
            </div>
          </div>
          {/*<Stats />*/}

          <PreviousYears />

          <Share />

          {/* <Comments /> */}

          <About />

          <div className="block block--newsletter--home">
            <TextBlock title="Stay Tuned" text={newsletterContents} />
            <Newsletter />
          </div>

          <div className="footer home-footer">
            <TextBlock>
              <p>
                Hand-coded in Osaka, Japan with <a href="http://nivo.rocks">Nivo</a> &{' '}
                <a href="http://gatsbyjs.org">Gatsby</a>. Extra data from <a href="https://bestof.js.org/">BestOfJS</a>
                .&nbsp;
                <a href="https://github.com/StateOfJS/StateOfJS">Leave an issue</a>
                &nbsp;or&nbsp;
                <a href="mailto:hello@stateofjs.com">Get in touch</a>.
              </p>
            </TextBlock>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
