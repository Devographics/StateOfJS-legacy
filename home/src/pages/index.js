import React from 'react'
import DocumentTitle from 'react-document-title'
import '../stylesheets/screen.scss'
import ResultsComingSoon from '../components/ResultsComingSoon'
import PreviousYears from '../components/PreviousYears'
import Share from '../components/Share'
import NewsletterIntro from '../components/NewsletterIntro'
import Newsletter from '../components/Newsletter'
import About from '../components/About'
import Footer from '../components/Footer'
// import Intro from '../components/Intro'
// import TakeSurvey from '../components/TakeSurvey'
// import ReactGA from 'react-ga'
// import Stats from '../components/common/Stats'
// import Comments from '../components/common/Comments'
// import Bubbles from '../components/Bubbles'

const Index = () => (
    <DocumentTitle title="The State Of JavaScript 2018">
        <div className="results-container content home">
            {/* <Bubbles /> */}
            <div className="intro section-narrow section-border">
                <ResultsComingSoon/>
                {/* <TakeSurvey /> */}
            </div>
            {/* <Stats /> */}
            <PreviousYears />
            <Share />
            {/* <Comments /> */}
            <div className="section block block--newsletter--home">
                <NewsletterIntro/>
                <Newsletter />
            </div>
            <About />
            <Footer/>
        </div>
    </DocumentTitle>
)

export default Index