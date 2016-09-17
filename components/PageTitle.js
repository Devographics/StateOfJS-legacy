import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

import Sections from '../data/sections.yaml'

export default function PageTitle ({ title, currentSection }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: currentSection });
  const previousSection = Sections[currentSectionIndex - 1]
  const nextSection = Sections[currentSectionIndex + 1]
  return (
    <div className="page-title">
      <div className="inner">
        {previousSection ? <Link className="pagination-link pagination-previous" to={`/2016/${previousSection.slug}/`} >&lt;&lt; {previousSection.name}</Link> : <span />}
        <h1>{title}</h1>
        <span className="spacer" />
        {nextSection ? <Link className="pagination-link pagination-next" to={`/2016/${nextSection.slug}/`} >{nextSection.name} &gt;&gt;</Link> : <span />}
      </div>
    </div>
  )
}