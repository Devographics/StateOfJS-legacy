import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

import '../stylesheets/screen.scss'

const Results = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <ul>
        <li><Link to="/flavors/">Flavors</Link> - Sacha ???</li>
        <li><Link to="/frontend/">Front-end</Link> - Sacha ???</li>
        <li><Link to="/statemanagement/">State Management</Link> - Tom</li>
        <li><Link to="/api/">API Layer</Link> - Abhi</li>
        <li><Link to="/fullstack/">Full Stack</Link> - Josh ???</li>
        <li><Link to="/testing/">Testing</Link> - Michael</li>
        <li><Link to="/css/">CSS</Link> - Arunoda ???</li>
        <li><Link to="/buildtools/">Build Tools</Link> - Wes ???</li>
        <li><Link to="/mobile/">Mobile</Link> - Bonnie ???</li>
      </ul>
    </div>
  </DocumentTitle>

export default Results
