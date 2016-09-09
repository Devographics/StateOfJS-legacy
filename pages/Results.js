import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

import '../stylesheets/screen.scss'

const Results = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <ul>
        <li><Link to="/flavors/">Flavors</Link></li>
        <li><Link to="/frontend/">Front-end</Link></li>
        <li><Link to="/api/">API Layer</Link></li>
        <li><Link to="/testing/">Testing</Link></li>
        <li><Link to="/mobile/">Mobile</Link></li>
      </ul>
    </div>
  </DocumentTitle>

export default Results
