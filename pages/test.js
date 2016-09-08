import React from 'react'
import DocumentTitle from 'react-document-title'

import Intro from './results/testing/_intro.md'

export default class Test extends React.Component {

  render () {
    console.log(Intro)
    return (
      <DocumentTitle title="Test Page">
        <div>
          <h2>Test</h2>
          <Intro/>
        </div>
      </DocumentTitle>
    )
  }
}
