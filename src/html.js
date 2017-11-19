import React from 'react'
import DocumentTitle from 'react-document-title'
import Helmet from 'react-helmet'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
    propTypes() {
        return {
            title: React.PropTypes.string,
        }
    },
    render() {
        const title = `State Of JavaScript: ${DocumentTitle.rewind()}`

        let css
        // let head = Helmet.rewind()
        if (process.env.NODE_ENV === 'production') {
            css = (
                <style dangerouslySetInnerHTML={{ __html: require('!raw!../public/styles.css') }} />
            )
        }

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{title}</title>
                    <link rel="shortcut icon" href="/images/favicon2.png" />
                    {css}
                    {/*head.meta.toComponent()*/}
                    {this.props.headComponents}
                </head>
                <body>
                    <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                    {this.props.postBodyComponents}
                </body>
            </html>
        )
    },
})
