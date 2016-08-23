import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
// import '../css/markdown-styles'
import ReactGA from 'react-ga';

if (typeof window !== "undefined") {
  ReactGA.initialize('UA-83022212-1');
}

const logPageView = () => {
  if(typeof window !== "undefined") {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },

  componentDidMount() {
    logPageView();
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
