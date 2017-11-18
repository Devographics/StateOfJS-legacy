import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import Sections from '../../data/sections.yaml'

import '../stylesheets/screen.scss'

const Results = () => (
    <DocumentTitle title="Results">
        <div className="results-container">
            <ul>
                {Sections.map(section => (
                    <li key={section.slug}>
                        <Link to={`/2016/${section.slug}/`}>{section.name}</Link> - {section.author}
                    </li>
                ))}
            </ul>
        </div>
    </DocumentTitle>
)

export default Results
