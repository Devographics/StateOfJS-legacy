import React from 'react'
import ResultsComingSoon from '../components/ResultsComingSoon'
import Share from '../components/Share'
import Newsletter from '../components/Newsletter'
// import TakeSurvey from '../components/TakeSurvey'
import About from '../components/About'
import Footer from '../components/Footer'
import Intro from '../components/Intro'
// import ViewResults from '../components/ViewResults'
// import ReactGA from 'react-ga'
import Layout from '../layouts/layout.js'

const Index = () => (
    <Layout>
        <div className="Content Content--Home Home">
            <Intro />
            <ResultsComingSoon />
            {/* <TakeSurvey /> */}
            <Share />
            <Newsletter />
            <About />
            <Footer />
        </div>
    </Layout>
)

export default Index
