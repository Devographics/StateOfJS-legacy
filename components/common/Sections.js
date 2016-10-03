import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import SectionsContent from '../../data/sections.yaml'
import Authors from '../../data/authors.yaml'

const renderAuthor = (section) => {
  const author = _.find(Authors, { slug: section.author })
  return (
    <span className="toc-section-author">
      by&nbsp;
      <a href={author.url}>{author.name}</a>
    </span>
  )
}

const Sections = () =>
  <div className="toc" id="toc">
    <ol>
      {SectionsContent.map(section => 
        <li key={section.slug} className="toc-section">
          <Link className="toc-section-name" to={`/2016/${section.slug}/`}>{section.name}</Link>
          {section.author === 'sacha' ?  null : renderAuthor(section)}
        </li>
      )}
    </ol>
  </div>

export default Sections
