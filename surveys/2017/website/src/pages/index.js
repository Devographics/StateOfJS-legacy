import React from 'react'
import Link from 'gatsby-link'
import DocumentTitle from 'react-document-title'
import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'
import Results2016 from '../components/common/Results2016.js'
import TextBlock from '../components/blocks/TextBlock.js'
import Comments from '../components/common/Comments.js'
import About from '../components/common/About.js'
import Newsletter from '../components/common/Newsletter'

const homeContents = `
The JavaScript world is richer and messier than ever.

So we collected data from over 20,000 developers, asking them questions on topics ranging from front-end frameworks and state management, to build tools and testing libraries.

You'll find out which libraries developers want to learn next, and which have the best satisfaction ratings. And hopefully, get a better understanding of the ever-changing JavaScript ecosystem.
`

const newsletterContents = `
Leave us your email and we'll let you know when next year's survey comes out. 
`

const IndexPage = () => (
    <DocumentTitle title="The State Of JavaScript 2017">
        <div className="results-container content home">
            <h1 className="logo">
                <img src="images/javascript2017.svg" alt="The State Of JavaScript" />
            </h1>
            <div className="bubbles">
                <h3 className="bubble bubble-great">
                    <img src="images/left-speech-bubble.svg" />
                    <span>JavaScript is great!</span>
                </h3>
                <h3 className="bubble bubble-mess">
                    <img src="images/right-speech-bubble.svg" />
                    <span>JavaScript is a mess!</span>
                </h3>
            </div>
            <div className="intro section-border section-narrow">
                <TextBlock text={homeContents} />
                <div className="view-results">
                    <Link className="button large-button" to="/2017/introduction/">
                        View Results
                    </Link>
                </div>
            </div>
            <Results2016 />
            <Share />
            <Comments />
            <About />
            <div className="block block--newsletter--home">
                <TextBlock title="Stay Tuned" text={newsletterContents} />
                <Newsletter />
            </div>
            <div className="footer home-footer">
                <TextBlock>
                    <p>
                        Hand-coded in Osaka, Japan with <a href="http://nivo.rocks">Nivo</a> &{' '}
                        <a href="http://gatsbyjs.org">Gatsby</a>. Extra data from{' '}
                        <a href="https://bestof.js.org/">BestOfJS</a>
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

export default IndexPage
