import React from 'react'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

import Sections from '../../../data/sections.yaml'
import Authors from '../../../data/authors.yaml'

const md = new MarkdownIt()

export default function AuthorBlock (props) {
  const currentSectionIndex = _.findIndex(Sections, { slug: props.section })
  const currentSection = Sections[currentSectionIndex]
  const author = props.author ? _.find(Authors, { slug: props.author }) : _.find(Authors, { slug: currentSection.author })

  return (
    <div className="section section-layout-b">
      <div className="section-contents-wide author">
        <h3 className="author-heading">About the Author</h3>
        <div className="author-main">
          <div className="author-inner">
            <div className="author-avatar">
              <a href={author.url}><img src={`/images/authors/${author.slug}.jpg`} /></a>
            </div>
            <div className="author-contents">
              <h3 className="author-name"><a href={author.url}>{author.name}</a></h3>
              <div className="author-bio" dangerouslySetInnerHTML={{ __html: md.render(author.bio) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AuthorBlock.propTypes = {
  section: React.PropTypes.string,
  author: React.PropTypes.string,
}
