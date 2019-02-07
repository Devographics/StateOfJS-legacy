import React from 'react'
import ResultsComingSoon from '../components/ResultsComingSoon'
import Share from '../components/Share'
import NewsletterIntro from '../components/NewsletterIntro'
import Newsletter from '../components/Newsletter'
import About from '../components/About'
import Footer from '../components/Footer'
import Intro from '../components/Intro'
// import ViewResults from '../components/ViewResults'
// import ReactGA from 'react-ga'
// import Stats from '../components/common/Stats'
// import Comments from '../components/common/Comments'
// import Bubbles from '../components/Bubbles'
import Layout from '../layouts/layout.js'

const Index = () => (
    <Layout>
        <div className="results-container content home">
            {/* <Bubbles /> */}
            <div className="intro section-narrow section-border">
                <Intro />
                {/* <ResultsComingSoon /> */}
                {/* <ViewResults /> */}
            </div>

            <div className="home-take-survey block">
                <a href="#" className="home-take-survey-button">Take The Survey</a>
            </div>
            {/* <Stats /> */}
            {/* <Comments /> */}
            <Share />

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
