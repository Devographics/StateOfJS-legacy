import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { PageContextConsumer } from '../pages/pageContext'
import { getPageSocialMeta, getPageMeta } from '../pages/pageHelpers'
import Trans from '../i18n/Trans'

const Head = () => (
    <PageContextConsumer>
        {context => (
            <Trans>
                {translate => {
                    const meta = getPageMeta(context, translate)
                    const socialMeta = getPageSocialMeta(context, translate)
                    const description =
                        'Discover the most popular JavaScript technologies of the year.'

                    const mergedMeta = [
                        { charset: 'utf-8' },
                        { name: 'description', content: description },
                        // responsive
                        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                        // google check
                        {
                            name: 'google-site-verification',
                            content: 'hrTRsz9fkGmQlVbLBWA4wmhn0qsI6_M3NKemTGCkpps'
                        },
                        // social
                        ...socialMeta
                    ]

                    return (
                        <Fragment>
                            <Helmet meta={mergedMeta} defaultTitle={meta.fullTitle}>
                                <html lang="en" />
                                <title>{meta.title}</title>
                                <link rel="shortcut icon" href="/images/favicon.png" />
                                <link
                                    rel="preconnect"
                                    href="https://fonts.gstatic.com/"
                                    crossOrigin
                                />
                                <link
                                    href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,300i,600"
                                    rel="stylesheet"
                                />
                            </Helmet>
                        </Fragment>
                    )
                }}
            </Trans>
        )}
    </PageContextConsumer>
)

export default Head
