import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

import Sections from '../../data/sections.yaml'
import Authors from '../../data/authors.yaml'

export default function AuthorBlock ({ section }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: section })
  const currentSection = Sections[currentSectionIndex]
  const author = _.find(Authors, { slug: currentSection.author })

  return (
    <div className="section section-layout-b">
      <div className="section-contents-wide author">
        <h3 className="author-heading">About the Author</h3>
        <div className="author-inner">
          <div className="author-avatar">
            <a href={author.url}><img src={author.avatar} /></a>
          </div>
          <div className="author-contents">
            <h2 className="author-name"><a href={author.url}>{author.name}</a></h2>
            <div className="author-bio" dangerouslySetInnerHTML={{ __html: md.render(author.bio) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

AuthorBlock.propTypes = {
  section: React.PropTypes.string,
}
