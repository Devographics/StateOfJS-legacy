import React, { Fragment } from 'react'
import 'stylesheets/screen.scss'
import Head from 'core/components/Head'
import Animation from 'core/components/Animation'
import { PageContextProvider } from 'core/pages/pageContext'
import { mergePageContext } from 'core/pages/pageHelpers'
import { I18nContextProvider } from 'core/i18n/i18nContext'

const Home = ({ pageContext, location }) => {
    const context = mergePageContext(pageContext, location)

    return (
        <PageContextProvider value={context}>
            <I18nContextProvider>
                <Fragment>
                    <Head />
                    <Animation />
                </Fragment>
            </I18nContextProvider>
        </PageContextProvider>
    )
}

export default Home
