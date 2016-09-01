import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import '../_stateofjs.scss'
import FrontEndData from '../../data/frontend.json'

export default class FrontEnd extends React.Component {

  render () {
    
    console.log(FrontEndData)

    return (
      <DocumentTitle title={`${config.siteTitle}: Front-End Frameworks`}>
        <div>
          <h3>Front-End Frameworks</h3>
        </div>
      </DocumentTitle>
    )
  }
}
