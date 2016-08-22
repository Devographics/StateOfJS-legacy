import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
// import '../css/markdown-styles'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div className="outer-wrapper">
        <div className="content">
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
