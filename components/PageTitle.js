import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import Sections from '../data/sections.yaml'

export default function PageTitle ({ title, currentSection }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: currentSection })
  const previousSection = Sections[currentSectionIndex - 1]
  const nextSection = Sections[currentSectionIndex + 1]

  const image = `http://stateofjs.com/exports/png/${currentSection}-stacked.png`
  const url = `http://stateofjs.com/2016/${currentSection}/`
  const description = title
  const meta = [
    // facebook
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    // twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  return (
    <div className="page-title">
      <Helmet meta={meta} />
      <div className="inner">
        {previousSection ? <Link className="pagination-link pagination-previous" to={`/2016/${previousSection.slug}/`} >&lt;&lt; {previousSection.name}</Link> : <span />}
        <h1>{title}</h1>
        <span className="spacer" />
        {nextSection ? <Link className="pagination-link pagination-next" to={`/2016/${nextSection.slug}/`} >{nextSection.name} &gt;&gt;</Link> : <span />}
      </div>
    </div>
  )
}

PageTitle.propTypes = {
  title: React.PropTypes.string,
  currentSection: React.PropTypes.string,
}
