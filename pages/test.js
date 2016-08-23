import React from 'react'
import DocumentTitle from 'react-document-title'

export default class Test extends React.Component {

  render () {
    return (
      <DocumentTitle title="Test Page">
        <div>
          <h2>Test</h2>
          <p>Test</p>
        </div>
      </DocumentTitle>
    )
  }
}
