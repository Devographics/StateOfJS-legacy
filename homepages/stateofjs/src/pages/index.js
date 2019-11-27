import React from 'react'
// import ResultsComingSoon from '../components/ResultsComingSoon'
import PreviousYears from '../components/PreviousYears'
import Share from '../components/Share'
import NewsletterIntro from '../components/NewsletterIntro'
import Newsletter from '../components/Newsletter'
import About from '../components/About'
import Footer from '../components/Footer'
import Intro from '../components/Intro'
// import ViewResults from '../components/ViewResults'
import TakeSurvey from '../components/TakeSurvey'
// import ReactGA from 'react-ga'
// import Stats from '../components/common/Stats'
// import Comments from '../components/common/Comments'
// import Bubbles from '../components/Bubbles'
import Layout from '../layouts/layout.js'

const Index = ({ location }) => (
    <Layout>
        <div className="results-container content home">
            {/* <Bubbles /> */}
            <div className="intro section-narrow section-border">
                <Intro />
                <TakeSurvey location={location}/>
            </div>
            {/* <Stats /> */}
            <PreviousYears />
            <Share />
            {/* <Comments /> */}
            <div className="section block block--newsletter--home">
                <NewsletterIntro />
                <Newsletter />
            </div>
            <About />
            <Footer />
        </div>
    </Layout>
)

export default Index
