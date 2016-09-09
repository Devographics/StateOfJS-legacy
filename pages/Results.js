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
        <li><Link to="/statemanagement/">State Management</Link></li>
        <li><Link to="/api/">API Layer</Link></li>
        <li><Link to="/fullstack/">Full Stack</Link></li>
        <li><Link to="/testing/">Testing</Link></li>
        <li><Link to="/css/">CSS</Link></li>
        <li><Link to="/buildtools/">Build Tools</Link></li>
        <li><Link to="/mobile/">Mobile</Link></li>
      </ul>
    </div>
  </DocumentTitle>

export default Results
