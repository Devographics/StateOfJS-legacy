import React from 'react'
import Helmet from 'react-helmet'
import withPageData from '../../helpers/withPageData'

const Head = ({ title, currentPage }) => {
    const pageTitle =
        title || (currentPage && currentPage.fullTitle) || 'The State of JavaScript 2018'
    const description = 'Discover the most popular JavaScript technologies of the year.'
    const url = 'https://2018.stateofjs.com'
    const image = 'https://2018.stateofjs.com/images/stateofjs2018-social.png'

    const meta = [
        { charset: 'utf-8' },
        { name: 'description', content: description },
        // responsive
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        // twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image:src', content: image },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
    ]

    return (
        <Helmet meta={meta} defaultTitle={pageTitle}>
            <html lang="en" />
            <title>{pageTitle}</title>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
            <link
                href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,300i,600"
                rel="stylesheet"
            />
        </Helmet>
    )
}

export default withPageData(Head)
