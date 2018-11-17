import React from 'react'
import Helmet from 'react-helmet'
import withPageData from '../../helpers/withPageData'

const Head = ({ title, currentPage }) => {
    const pageTitle =
        title || (currentPage && currentPage.fullTitle) || 'The State of JavaScript 2018'
    const description = 'Discover the most popular JavaScript technologies of the year.'
    const url = 'http://stateofjs.com'
    const image = 'http://stateofjs.com/images/stateofjs2018-social.png'

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
        { name: 'twitter:description', content: description },

        // eslint-disable-next-line react/jsx-key
        <script src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript" />
    ]

    console.log(meta)

    return (
        <Helmet meta={meta} defaultTitle={pageTitle}>
            <title>{pageTitle}</title>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <link
                href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,300i,600"
                rel="stylesheet"
            />
        </Helmet>
    )
}

export default withPageData(Head)
