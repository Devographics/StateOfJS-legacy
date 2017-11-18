import React from 'react'
// import Link from 'gatsby-link'
import DocumentTitle from 'react-document-title'

// import ReactGA from 'react-ga'

import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'
import Results2016 from '../components/common/Results2016.js'

import TextBlock from '../components/blocks/TextBlock.js'
// import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js'

import homeContents from '../../data/home/home.md'

export default class Index extends React.Component {
    render() {
        return (
            <DocumentTitle title="The State Of JavaScript">
                <div className="results-container content home">
                    <h1 className="logo">
                        <img src="images/javascript2017.svg" alt="The State Of JavaScript" />
                        {/*<div className="logo-1"/>
            <div className="logo-2"/>*/}
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

                    <TextBlock
                        contents={homeContents}
                        className="intro section-border section-narrow"
                    />

                    {/*<Stats />*/}

                    <Results2016 />

                    <Share />

                    <Comments />
                </div>
            </DocumentTitle>
        )
    }
}
