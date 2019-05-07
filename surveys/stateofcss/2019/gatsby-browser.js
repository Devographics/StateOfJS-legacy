import React from 'react'
import * as ReactGA from 'react-ga'
import Layout from 'core/Layout'

ReactGA.initialize('UA-83022212-5')

// eslint-disable-next-line no-unused-vars
const ascii = `STATE OF CSS`

export const onClientEntry = () => {
    // console.log(ascii)
}

export const onRouteUpdate = ({ location }) => {
    ReactGA.pageview(location.pathname)
}

export const wrapPageElement = ({ element, props }) => {
    const { pageContext, ...rest } = props

    return (
        <Layout {...rest} pageContext={pageContext}>
            {element}
        </Layout>
    )
}
