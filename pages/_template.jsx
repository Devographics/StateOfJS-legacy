import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import Helmet from 'react-helmet'

// import '../css/markdown-styles'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },

  render () {

    const title = DocumentTitle.peek()
    const description = "A short survey about current popular JavaScript technologies.";
    const url = "http://stateofjs.com";
    const image = "http://stateofjs.com/images/javascript9.png";

    const meta = [
      { charset: "utf-8" },
      { name: "description", content: description },
      // responsive
      { name: "viewport", content:"width=device-width, initial-scale=1" },
      // facebook
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      //twitter
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image:src", content: image },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }
    ];

    return (
      <div className="outer-wrapper">
        <div className="content">
          <Helmet meta={meta} />
          <link href="https://fonts.googleapis.com/css?family=Space+Mono:400i|Work+Sans:400,700" rel="stylesheet"/>
          {this.props.children}
          {/*
          <div className="footer">
            Built by <a href="http://twitter.com/SachaGreif">Sacha Greif</a> using <a href="https://github.com/gatsbyjs/gatsby">Gatsby</a>
          </div>
          */}
        </div>
      </div>
    )
  },
})
